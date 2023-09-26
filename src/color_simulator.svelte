<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;
  export let bloom: number = 1.0;
  export let glow: boolean = false;

  // TODO move definition. probably change it
  type Light = {color: Color, brightness?: number};

  import { onMount } from 'svelte';
  import bezier from 'bezier-easing';
  import shuffleArray from 'shuffle-array'

  import ColorBox from './color_box.svelte';
  import type { Color } from './lib/color';
  import { scaleColor, mix, color } from './lib/color';
  import { temperatureToRGB } from './lib/color_temperature';
  import {
    White,
    Black,
    Red,
    Green,
    Blue,
    Yellow,
    Magenta,
    Cyan,
    Orange,
    Azure
  } from './lib/colors';
  import { partition, repeatArray, repeat } from './lib/utils';

  function getLights(colors: Color[], glow: boolean, seed: number, offsets?: number[]): Light[] {
    return colors.map((color, index) => {
      const progressValue = (seed % GLOW_PERIOD);
      const offset = (offsets?.[index] || Math.floor((index / colors.length) * GLOW_PERIOD));
      const progressValueOffset = (progressValue + offset) % GLOW_PERIOD;

      const glowValue = precomputedGlowValues.get(progressValueOffset);
      return {
        color,
        brightness: glow ? glowValue : 1.0,
      };
    });
  }

  function computeGlowValue(seed: number) {
    const progressValue = (seed % GLOW_PERIOD) / GLOW_PERIOD;
    const symmetricalizedProgressValue = Math.abs(progressValue - 0.5) * 2.0;
    const rawGlowValue = ease(symmetricalizedProgressValue);
    const scaledGlowValue = GLOW_RANGE.start * (1 - rawGlowValue) + GLOW_RANGE.end * (rawGlowValue)
    
    return scaledGlowValue;
  }

  function ease(number: number) {
    return bezier(0.25, 0.1, 0.25, 0.1)(number);
  }

  const GLOW_PERIOD = 8_000;
  const GLOW_RANGE = {start: 0.25, end: 1.0};

  const MAX_WIDTH_PER_NUM_COPIES = 400;
  const LIGHT_GROUP_SIZE = 4;
  const pureColors = [
    White,
    Black,
    Red,
    Green,
    Blue,
    Yellow,
    Magenta,
    Cyan,
  ];
  const christmasColors = [
    Blue,
    Green,
    Orange,
    Red,
  ];

  const numCopies = 1;
  let itemsPerRow: number;
  let boxSize: string;

  let lights: Light[];
  let lightSource: Color;
  let lightRows: Light[][];

  // const colorPool = repeatArray(christmasColors, 12);
  const colorPool = repeatArray(christmasColors, 4);
  const randomizedOffsets = colorPool.map(() => Math.floor(Math.random() * GLOW_PERIOD));
  // Computed glow values for [0, ... , GLOW_PERIOD]
  const precomputedGlowValues: Map<number, number> = new Map(new Array(GLOW_PERIOD).fill(undefined).map((item, indexAsSeed) => {
    return [indexAsSeed, computeGlowValue(indexAsSeed)];
  }));

  $: boxSize = `${MAX_WIDTH_PER_NUM_COPIES / numCopies}px`;
  $: lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
  $: lights = getLights(colorPool, glow, new Date().getTime(), randomizedOffsets);
  $: lightRows = partition(lights, LIGHT_GROUP_SIZE);
  $: itemsPerRow = lights.length;

  onMount(()=> {
    const interval = setInterval(() => {
      if (glow) {
        lights = getLights(colorPool, glow, new Date().getTime(), randomizedOffsets);
      }
    }, 8);

    return () => {
      clearInterval(interval);
    }
  });

</script>

<div class="color_simulator">
  <div class='light_rows' style:--itemsPerRow={itemsPerRow}>
    {#each lightRows as lightRow}
      <div class='light_row' style:--boxSize={boxSize}>
        {#each lightRow as light}
          <ColorBox lightSource={lightSource} color={light.color} filterStrength={filterStrength} brightness={light.brightness} bloom={bloom} --boxSize={boxSize}></ColorBox>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .color_simulator {
    animation: fadein 0.4s;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
  }
  .light_rows {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    margin: auto;
    padding-left: 2em;
    padding-right: 2em;
    /* max-width: 80vw; */
    gap: 2%;
    row-gap: 2%;
  }
  .light_row {
    max-width: 800px;
    overflow: visible;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: row;
    display: flex;
    gap: 4%;
    flex-basis: var(--boxSize, 200px);
    /* min-width: 250px; */
    padding-bottom: 4%;
  }
  @keyframes fadein {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }
  /* canvas {
    margin: auto;
    margin-top: 20em;
    display: block;
  } */
</style>
