<script lang="ts">
  import type { Color } from './lib/color';
  import { scaleColor, setBrightness } from './lib/color'
  import { colorString, getBrightness, getLuminance } from './lib/color';
  import { getLightColors } from './lib/colored_light';
  import bezier from 'bezier-easing';

  export let lightSource: Color;
  export let color: Color;
  export let filterStrength: number;
  export let brightness: number;
  export let brightnessAdjustment: number | undefined;
  export let bloom: number = 0;
  export let coloredDiode: boolean = false;

  $: lightSource = coloredDiode ? setBrightness(color, 0.5) : lightSource;
  $: scaledLightSource = brightness ? scaleColor(lightSource, brightness * (brightnessAdjustment || 1.0)) : lightSource;

  console.log(lightSource)
  console.log(scaledLightSource)

  $: ({ low, mid, high } = getLightColors(scaledLightSource, color, filterStrength));
  $: luminance = getBrightness(low);
  $: lowString = colorString(low);
  $: midString = colorString(mid);
  $: highString = colorString(high);
  $: glow1 = colorString(low, luminance * 0.25);
  $: glow2 = colorString(mid, luminance * 0.1);
  $: glow3 = colorString(high, luminance * 0.1);
  // $: glowRadius = `${bloom * luminance * 10}em`
  $: glowRadius = `${bloom * luminance * 11}vw`
</script>

<div 
style:--low={lowString}
style:--mid={midString}
style:--high={highString}
style:--glow1={glow1}
style:--glow2={glow2}
style:--glow3={glow3}
style:--glowRadius={glowRadius}
class="color_box">
  <div class="layer_1 glow">
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
