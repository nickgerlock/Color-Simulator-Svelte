<script lang="ts">
  import ColorControls from './color_controls.svelte';
  import type { ColorOptionKey } from './color_options';
  import ColorSimulator from './color_simulator.svelte';
  import { BloomRange, BrightnessRange, ColorTemperatureRange, FilterStrengthRange, GlowPeriodRange } from './lib/ranges';

  let brightness: number = BrightnessRange.default;
  let bloom: number = BloomRange.default;
  let colorTemperature: number = ColorTemperatureRange.default; let filterStrength: number = FilterStrengthRange.default;
  let glow: boolean = true;
  let glowPeriod: number = GlowPeriodRange.default;
  let ledMode: boolean = false;
  let colorOption: ColorOptionKey = 'christmas';
</script>

<div class="page">
  <div class="header">
    <h1>Color Simulator</h1>
  </div>

  <div class="content">
    <div class="color_simulator_container">
      <ColorSimulator brightness={brightness} colorTemperature={colorTemperature} filterStrength={filterStrength} bloom={bloom} glow={glow} glowPeriod={glowPeriod} ledMode={ledMode} colorOption={colorOption}></ColorSimulator>
    </div>

    <div class="color_controls_container">
      <ColorControls bind:brightness={brightness} bind:colorTemperature={colorTemperature} bind:filterStrength={filterStrength} bind:bloom={bloom} bind:glow={glow} bind:glowPeriod={glowPeriod} bind:ledMode={ledMode} bind:colorOption={colorOption}></ColorControls>
    </div>
  </div>

  <div class="footer"></div>
</div>

<style>
  :root {
    --background-color: #000000;
    --font-color: #666666;
    --border-color: #111111;

    background: var(--background-color);
    color: var(--font-color);
    font-family: Arial, Helvetica, sans-serif;
		height: 100%;

    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .page {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    /* margin: 8px;
    padding: 8px; */
  }
  .header {
    padding: 0px 8px 0px 8px;
    margin: 0px 8px 0px 8px;
    height: 6em;
  }

  .footer {
    height: 6em;
  }
  .content {
    box-sizing: border-box;
    overflow: visible;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100%;

    width: min(100%, 1920px);

    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-around;
    gap: 10px;
    margin: auto;
  }


  .color_simulator_container {
    overflow: visible;
    box-sizing: border-box;
    display: flex;
    flex-grow: 10;
    flex-shrink: 1;
    aspect-ratio: 1;
    max-width: 100%;
  }

  .color_controls_container {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 1;
    padding: 1em;
  }

  @media (min-aspect-ratio: 1) {
    .color_simulator_container {
      max-width: calc(100% - 400px);
      /* min-height: 90%; */
      /* max-width: calc(min(100% - 400px, 1080px)); */
    }

    .color_controls_container {
      height: 100%;
      width: 325px;
      margin-bottom: auto;
    }

    .content {
    }
  }

  @media (max-aspect-ratio: 1) {
    .header {
      display: none;
    }

    .footer {
      display: none;
    }

    .color_simulator_container {
      /* width: 100%; */
      /* max-height: 60%; */
      /* height: 48%; */
    }

    .color_controls_container {
      /* height: 48%; */
    }
  }

</style>
