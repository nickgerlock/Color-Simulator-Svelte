<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;
  export let bloom: number = 1.0;

  export let glow: boolean = false;
  export let glowPeriod: number = 8000;
  export let glowRange: {start: number, end: number} = {start: 0.5, end: 1.25};

  export let ledMode: boolean = false;

  export let colorOption: ColorOptionKey = 'christmas';

  import { onMount } from 'svelte';
  import { getColorFromTemperatureVariantLightSource, tempatureVariantLightSource } from './lib/color_temperature';

  import ColoredLight from './colored_light.svelte';
  import type { Color } from './lib/color';
  import {
    White,
  } from './lib/colors';
  import { partition, repeatArray, repeat, rotate } from './lib/utils';
  import { ease, easeOut } from './lib/easing';
  import bezier from 'bezier-easing';
  import { getColors, type ColorOptionKey } from './color_options';

  // TODO move definition. probably change it
  type Light = {
    color: Color,
    lightSource: Color,
    brightness: number,
    filterStrength: number,
  };

  function getLights(colors: Color[], lightSource: Color, brightness: number, filterStrength: number, glow: boolean, seed: number, offsets?: number[], ledMode=false, glowPeriod:number = 8000): Light[] {
    return colors.map((color, index) => {
      lightSource = ledMode ? color : lightSource;
      let glowValue: number = 1.0;
      if (glow) {
        const progressValue = (seed % glowPeriod);
        const offset = (offsets?.[index] || Math.floor(((colors.length - index) / colors.length) * glowPeriod));
        const progressValueOffset = (progressValue + offset) % glowPeriod;

        glowValue = precomputedGlowValues[progressValueOffset] as number;
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
    const rawGlowValue = ease(symmetricalizedProgressValue);
    const scaledGlowValue = glowRange.start * (1 - rawGlowValue) + glowRange.end * (rawGlowValue)
    
    return scaledGlowValue;
  }

  // Maps brightnesses within 0-1 to a different range, following
  // a specific brightness curve.
  function mapBrightness(brightness: number, ledMode: boolean) {
    const INCANDESCENT_CURVE = bezier(0.0, 1.08, 0.11, 0.87);
    // const LED_CURVE = bezier(0.0, 1.08, 0.11, 0.87);
    const LED_CURVE = easeOut;
    const INCANDESCENT_BRIGHTNESS_RANGE = [0, 1.5];
    const LED_BRIGHTNESS_RANGE = [0, 1.5];

    const brightnessRange = ledMode ? LED_BRIGHTNESS_RANGE : INCANDESCENT_BRIGHTNESS_RANGE;
    const curve = ledMode ? LED_CURVE : INCANDESCENT_CURVE;

    return brightnessRange[0] + curve(brightness) * brightnessRange[1];
  };

  let lights: Light[];
  let lightSource: Color;

  // Computed glow values for [0, ... , GLOW_PERIOD]
  let precomputedGlowValues: Record<number, number>;
  // TODO: should probably change this to a random walk.
  $: precomputedGlowValues = Object.fromEntries(new Array(glowPeriod).fill(undefined).map((item, indexAsSeed) => {
    return [indexAsSeed, computeGlowValue(indexAsSeed, glowPeriod)];
  }));

  $: colorPool = getColors(colorOption);
  $: finalBrightness = mapBrightness(brightness, ledMode);
  $: lightEmitter = tempatureVariantLightSource(colorTemperature);
  $: lightSource = ledMode ? White : getColorFromTemperatureVariantLightSource(lightEmitter, brightness);

  $: numLightsPerRow = colorPool.length;
  $: numLightsPerColumn = colorPool.length;
  $: aspectRatio = numLightsPerRow / numLightsPerColumn;
  $: inverseAspectRatio = numLightsPerRow / numLightsPerColumn;
  $: fullColorList = repeatArray(colorPool, numLightsPerColumn);
  // $: fullColorList = repeat(colorPool, numLightsPerColumn).map((array, index) => rotate(array, index)).flat();
  $: randomizedOffsets = fullColorList.map(() => Math.floor(Math.random() * glowPeriod));
  // $: randomizedOffsets = undefined;
  $: numLights = fullColorList.length;

  $: lights = getLights(fullColorList, lightSource, finalBrightness, filterStrength, glow, new Date().getTime(), randomizedOffsets, ledMode, glowPeriod);

  onMount(()=> {
    const interval = setInterval(() => {
      if (glow) {
        lights = getLights(fullColorList, lightSource, finalBrightness, filterStrength, glow, new Date().getTime(), randomizedOffsets, ledMode, glowPeriod);
      }
    }, 8);

    return () => {
      clearInterval(interval);
    }
  });

</script>

<div class="color_simulator">

    <div class='lights' style:--lightsPerRow={numLightsPerRow} style:--aspectRatio={aspectRatio} style:--inverseAspectRatio={inverseAspectRatio}>
      {#each lights as light}
        <ColoredLight lightSource={light.lightSource} color={light.color} filterStrength={filterStrength} brightness={light.brightness} bloom={bloom} ledMode={ledMode} numLights={numLights}></ColoredLight>
      {/each}
    </div>
</div>

<style>
  @media (max-width: 800px) {
  }

  .lights {
    --maxHeight: 100%;
    --maxWidth: min(100%, var(--maxWidthFromHeight));
  }

  .color_simulator {
    display: flex;
    animation: fadein 0.4s;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: visible;
    margin: auto;
    aspect-ratio: 1;
    width: 100%;
    max-height: 100%;
  }

  .lights {
    --maxWidthFromHeight: calc((var(--maxHeight) * var(--aspectRatio)));
    --maxHeightFromWidth: calc((var(--maxWidth) * var(--inverseAspectRatio)));
    overflow: visible;
    margin: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    margin: auto;
    box-sizing: border-box;
    padding: 2em;

    aspect-ratio: 1;

    flex-grow: 1;

    display: grid;
    
    grid-auto-flow: row;
    grid-template-columns: repeat(var(--lightsPerRow), minmax(0, 1fr));
    grid-auto-rows: min-content;

    /* height: 100%; */
    max-width: 100%;
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
