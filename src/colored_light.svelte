<script lang="ts">
  import type { Color } from './lib/color';
  import { scale, setBrightness, colorString } from './lib/color'
  import { getBrightness, getLuminance } from './lib/color';
  import { getLightColors } from './lib/colored_light';

  export let lightSource: Color;
  export let color: Color;
  export let filterStrength: number;
  export let brightness: number;
  export let bloom: number = 0;
  export let ledMode: boolean;

  const glowRadiusMultiplier = ledMode ? 8 : 12;
  const glowTransparancyMultiplier = ledMode ? 0.4 : 0.2;

  $: ({ low, mid, high, glow, glowBrightness } = getLightColors(scale(lightSource, brightness), color, brightness, filterStrength));
  $: lowString = colorString(low);
  $: midString = colorString(mid);
  $: highString = colorString(high);

  $: glowLow = colorString(low, getBrightness(low) * glowTransparancyMultiplier);
  $: glowMid = colorString(mid, getBrightness(mid) * glowTransparancyMultiplier);
  $: glowHigh = colorString(high, getBrightness(high) * glowTransparancyMultiplier);
  $: glowRadius = `${Math.min(glowBrightness * glowRadiusMultiplier, 60)}vw`
  // $: glowRadius = `${bloom * luminance * 10}em`

</script>

<div 
style:--low={lowString}
style:--mid={midString}
style:--high={highString}
style:--glowLow={glowLow}
style:--glowMid={glowMid}
style:--glowHigh={glowHigh}
style:--glowRadius={glowRadius}
class="color_box">
  <div class="layer_1 glow_1">
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
    grid-column-start: auto;
    grid-column-end: auto;
    display: block;
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    /* flex-basis: 100px; */
    /* flex-grow: 1; */
    /* flex-shrink: 1; */
  }
  .color_box .layer {
    margin: auto;
    aspect-ratio: 1;
    display: flex;
    border-radius: 2%;
  }
  .color_box .glow_1 {
    border-radius: 50%;
    box-shadow: 0px 0px calc(var(--glowRadius) * 0.5) var(--glowRadius) var(--glowLow);
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
