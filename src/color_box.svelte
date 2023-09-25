<script lang="ts">
  import type { Color } from './lib/color';
  import { White, Orange } from './lib/colors'
  import { colorString, getBrightness, getLuminance } from './lib/color';
  import { getLightColors } from './lib/colored_light';

  export let lightSource: Color;
  export let color: Color;
  export let filterStrength: number;

  $: ({ low, mid, high } = getLightColors(lightSource, color, filterStrength));
  $: luminance = getBrightness(low);
  $: lowString = colorString(low);
  $: midString = colorString(mid);
  $: highString = colorString(high);
  $: glow1 = colorString(low, luminance * 0.25);
  $: glow2 = colorString(mid, luminance * 0.1);
  $: glow3 = colorString(high, luminance * 0.1);
  $: glowRadius = `${Math.floor(luminance * 160)}px`
</script>

<div style="--low:{lowString}; --mid:{midString}; --high:{highString}; --glow1:{glow1}; --glow2:{glow2}; --glow3:{glow3}; --glowRadius:{glowRadius}" class="color_box">
  <div class="glow">
  <div class="layer layer_1">
    <div class="layer layer_2">
      <div class="layer layer_3">
      </div>
    </div>
  </div>
  </div>
</div>

<style>
  .color_box {
    display: block;
    aspect-ratio: 1;
    flex-basis: 100px;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .color_box .layer {
    margin: auto;
    aspect-ratio: 1;
    display: flex;
    border-radius: 2%;
  }
  .color_box .glow {
    border-radius: 50%;
    box-shadow: 0px 0px calc(var(--glowRadius) * 0.5) var(--glowRadius) var(--glow1);
  }
  .color_box .layer_1 {
    background-color: var(--low, #ddd);
    /* box-shadow: 0px 0px 20px var(--glowRadius) var(--glow1); */
  }
  .color_box .layer_2 {
    width: 75%;
    background-color: var(--mid, #ddd);
    /* box-shadow: 0px 0px 20px calc(var(--glowRadius)) var(--glow2); */
  }
  .color_box .layer_3 {
    width: 50%;
    background-color: var(--high, #ddd);
    /* box-shadow: 0px 0px 20px calc(var(--glowRadius)) var(--glow3); */
  }
</style>
