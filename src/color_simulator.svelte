<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;
  export let bloom: number = 1.0;

  export let glow: boolean = false;
  export let glowPeriod: number = 8000;
  export let glowRange: {start: number, end: number} = {start: 0.25, end: 1.0};

  export let ledMode: boolean = false;

  // TODO move definition. probably change it
  type Light = {
    color: Color,
    lightSource: Color,
    brightness: number,
    filterStrength: number,
  };

  import { onMount } from 'svelte';
  import { Incandescent, getColorFromTemperatureVariantLightSource, tempatureVariantLightSource } from './lib/color_temperature';

  import ColoredLight from './colored_light.svelte';
  import type { Color } from './lib/color';
  import { scale, mix, color } from './lib/color';
  import { getColorByTemperature, getColorByTemperatureWithBrightness } from './lib/color_temperature';
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
    Azure,
    LedOrange,
  } from './lib/colors';
  import { partition, repeatArray, repeat } from './lib/utils';
  import { ease, easeOut } from './lib/easing';

  function getLights(colors: Color[], lightSource: Color, brightness: number, filterStrength: number, glow: boolean, seed: number, offsets?: number[], ledMode=false, glowPeriod:number = 8000): Light[] {
    return colors.map((color, index) => {
      lightSource = ledMode ? color : lightSource;
      let glowValue: number = 1.0;
      if (glow) {
        const progressValue = (seed % glowPeriod);
        const offset = (offsets?.[index] || Math.floor((index / colors.length) * glowPeriod));
        const progressValueOffset = (progressValue + offset) % glowPeriod;

        glowValue = precomputedGlowValues.get(progressValueOffset) as number;
      }

      return {
        color,
        lightSource,
        filterStrength,
        brightness: brightness * (glowValue ?? 1.0),
      };
    });
  }

  function computeGlowValue(seed: number, glowPeriod: number) {
    const progressValue = (seed % glowPeriod) / glowPeriod;
    const symmetricalizedProgressValue = Math.abs(progressValue - 0.5) * 2.0;
    const rawGlowValue = symmetricalizedProgressValue;
    const scaledGlowValue = glowRange.start * (1 - rawGlowValue) + glowRange.end * (rawGlowValue)
    
    return scaledGlowValue;
  }

  const MAX_WIDTH_PER_NUM_COPIES = 400;
  const NUM_LIGHTS_PER_ROW = 4;
  const BRIGHTNESS_MULTIPLIER = 1.5;
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
    // mix(Blue, Azure, 0.75),
    Blue,
    Green,
    // ledMode ? LedOrange: Orange,
    Orange,
    Red,
  ];

  let lights: Light[];
  let lightSource: Color;
  // let lightRows: Light[][];

  const colorPool = repeatArray(christmasColors, 4);
  // Computed glow values for [0, ... , GLOW_PERIOD]
  let precomputedGlowValues: Map<number, number>;
  // TODO: should probably change this to a random walk.
  $: precomputedGlowValues = new Map(new Array(glowPeriod).fill(undefined).map((item, indexAsSeed) => {
    return [indexAsSeed, computeGlowValue(indexAsSeed, glowPeriod)];
  }));

  const numLights = colorPool.length;
  const numRows = numLights / NUM_LIGHTS_PER_ROW;
  const aspectRatio = NUM_LIGHTS_PER_ROW / numRows;
  const inverseAspectRatio = numRows / NUM_LIGHTS_PER_ROW;

  $: randomizedOffsets = colorPool.map(() => Math.floor(Math.random() * glowPeriod));
  $: finalBrightness = easeOut(brightness) * BRIGHTNESS_MULTIPLIER;
  $: lightEmitter = tempatureVariantLightSource(colorTemperature);
  $: lightSource = ledMode ? White : getColorFromTemperatureVariantLightSource(lightEmitter, brightness);
  $: lights = getLights(colorPool, lightSource, finalBrightness, filterStrength, glow, new Date().getTime(), randomizedOffsets, ledMode, glowPeriod);

  onMount(()=> {
    const interval = setInterval(() => {
      if (glow) {
        lights = getLights(colorPool, lightSource, finalBrightness, filterStrength, glow, new Date().getTime(), randomizedOffsets, ledMode, glowPeriod);
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
      <ColoredLight lightSource={light.lightSource} color={light.color} filterStrength={filterStrength} brightness={light.brightness} bloom={bloom} ledMode={ledMode}></ColoredLight>
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
