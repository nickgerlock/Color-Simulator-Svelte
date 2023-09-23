<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;

  import ColorBox from './color_box.svelte';
  import type { Color } from './lib/color';
  import { scaleColor, filterColor, colorString } from './lib/color';
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
  } from './lib/colors';

  const MAX_WIDTH_PER_NUM_COPIES = 200;
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

  const numCopies = 1;
  let itemsPerRow: number;
  let maxWidth: string;

  let colors: [string, string, string][];
  let lightSource: Color;
  let lightRows: [string, string, string][][];

  $: maxWidth = `${MAX_WIDTH_PER_NUM_COPIES / numCopies}px`;
  $: lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
  $: colors = pureColors.map(color => {
    return [
      colorString(scaleColor(filterColor(lightSource, scaleColor(color, 1.5), filterStrength), 1.0)),
      colorString(scaleColor(filterColor(lightSource, scaleColor(color, 1.75), filterStrength * 0.7), 1.2)),
      colorString(scaleColor(filterColor(lightSource, scaleColor(color, 2.0), filterStrength * 0.2), 1.4)),
    ];
  });
  $: lightRows = [colors.slice(0, colors.length / 2), colors.slice(colors.length / 2)];
  $: itemsPerRow = colors.length;

</script>

<div class="color_simulator">
  <div class='light_rows' style='--itemsPerRow:{itemsPerRow}'>
    {#each lightRows as lightRow}
      <div class='light_row' style="--maxWidth:{maxWidth}">
        {#each lightRow as light}
          <ColorBox --color1={light[0]} --color2={light[1]} --color3={light[2]} --maxWidth={maxWidth}></ColorBox>
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
    height: 100%;
  }
  .light_rows {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-basis: 300px;
    margin: auto;
    max-width: 80vw;
    gap: 2%;
    row-gap: 2%;
  }
  .light_row {
    flex-grow: 1;
    flex-direction: row;
    display: flex;
    gap: 4%;
    flex-basis: var(--maxWidth, 200px);
    min-width: 250px;
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
