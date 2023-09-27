<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;
  export let bloom: number = 1.0;
  export let glow: boolean = false;

  export let coloredDiode: boolean = false;

  // TODO move definition. probably change it
  type Light = {
    color: Color,
    brightness: number,
    brightnessAdjustment?: number,
  };

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

  function getLights(colors: Color[], brightness: number, glow: boolean, seed: number, offsets?: number[]): Light[] {
    return colors.map((color, index) => {
      const progressValue = (seed % GLOW_PERIOD);
      const offset = (offsets?.[index] || Math.floor((index / colors.length) * GLOW_PERIOD));
      const progressValueOffset = (progressValue + offset) % GLOW_PERIOD;

      const glowValue = precomputedGlowValues.get(progressValueOffset);
      return {
        color,
        brightness,
        brightnessAdjustment: glow ? glowValue : 1.0,
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
  const NUM_LIGHTS_PER_ROW = 4;
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

  let lights: Light[];
  let lightSource: Color;
  // let lightRows: Light[][];

  // const colorPool = repeatArray(christmasColors, 12);
  const colorPool = repeatArray(christmasColors, 4);
  const randomizedOffsets = colorPool.map(() => Math.floor(Math.random() * GLOW_PERIOD));
  // Computed glow values for [0, ... , GLOW_PERIOD]
  const precomputedGlowValues: Map<number, number> = new Map(new Array(GLOW_PERIOD).fill(undefined).map((item, indexAsSeed) => {
    return [indexAsSeed, computeGlowValue(indexAsSeed)];
  }));

  const numLights = colorPool.length;
  const numRows = numLights / NUM_LIGHTS_PER_ROW;
  const aspectRatio = NUM_LIGHTS_PER_ROW / numRows;
  const inverseAspectRatio = numRows / NUM_LIGHTS_PER_ROW;

  $: lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
  $: lights = getLights(colorPool, brightness, glow, new Date().getTime(), randomizedOffsets);

  onMount(()=> {
    const interval = setInterval(() => {
      if (glow) {
        lights = getLights(colorPool, brightness, glow, new Date().getTime(), randomizedOffsets);
      }
    }, 8);

    return () => {
      clearInterval(interval);
    }
  });

</script>

<div class="color_simulator">
  <div class='lights' style:--lightsPerRow={NUM_LIGHTS_PER_ROW} style:--aspectRatio={aspectRatio} style:--inverseAspectRatio={inverseAspectRatio}>
    {#each lights as light}
      <ColorBox lightSource={lightSource} color={light.color} filterStrength={filterStrength} brightness={light.brightness} brightnessAdjustment={light.brightnessAdjustment} bloom={bloom} coloredDiode={coloredDiode}></ColorBox>
    {/each}
  </div>
</div>

<style>
  .color_simulator {
    animation: fadein 0.4s;
    display: grid;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: visible;
  }
  .lights {
    --maxHeight: 60vh; /* TODO: this is arbitrary */
    --maxWidthFromHeight: calc((var(--maxHeight) * var(--aspectRatio)));
    --maxHeightFromWidth: calc((var(--maxWidth) * var(--inverseAspectRatio)));
    --maxWidth: min(80vw, var(--maxWidthFromHeight));
    overflow: visible;
    margin: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    width: var(--maxWidth);
    max-height: var(--maxHeightFromWidth);

    display: grid;
    
    grid-auto-flow: row;
    grid-row-gap: max(1.5vw, 10px);
    grid-column-gap: max(1.5vw, 10px);
    grid-template-columns: repeat(var(--lightsPerRow), minmax(0, 1fr));
    grid-template-rows: repeat(auto, 10px);
    /* grid-auto-rows: minmax(100px, auto); */
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
