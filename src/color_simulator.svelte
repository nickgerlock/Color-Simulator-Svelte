<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;

  import shuffleArray from 'shuffle-array'
  import ColorBox from './color_box.svelte';
  import type { Color } from './lib/color';
  import { scaleColor, mix } from './lib/color';
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
  const whites = [
    White,
    White,
    White,
    White,
  ];

  const numCopies = 1;
  let itemsPerRow: number;
  let boxSize: string;

  let colors: Color[];
  let lightSource: Color;
  let lightRows: Color[][];

  const partition: <T>(array: Array<T>, chunkSize: number) => Array<Array<T>> = <T,>(array: Array<T>, chunkSize: number) => {
    const numChunks = Math.ceil(array.length / chunkSize);
    return new Array(numChunks).fill(undefined).map((_, chunkIndex) => {
        return array.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
    });
  };

  const colorPool = pureColors;

  $: boxSize = `${MAX_WIDTH_PER_NUM_COPIES / numCopies}px`;
  $: lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
  $: colors = colorPool;
  $: lightRows = partition(colors, LIGHT_GROUP_SIZE);
  $: itemsPerRow = colors.length;

</script>

<div class="color_simulator">
  <div class='light_rows' style:--itemsPerRow={itemsPerRow}>
    {#each lightRows as lightRow}
      <div class='light_row' style:--boxSize={boxSize}>
        {#each lightRow as light}
          <ColorBox lightSource={lightSource} color={light} filterStrength={filterStrength} --boxSize={boxSize}></ColorBox>
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
    max-height: 800px;
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
