<script lang="ts">
  import ColorControls from './color_controls.svelte';
  import ColorSimulator from './color_simulator.svelte';
  import { BloomRange, BrightnessRange, ColorTemperatureRange, FilterStrengthRange, GlowPeriodRange } from './lib/ranges';

  let brightness: number = BrightnessRange.default;
  let bloom: number = BloomRange.default;
  let colorTemperature: number = ColorTemperatureRange.default;
  let filterStrength: number = FilterStrengthRange.default;
  let glow: boolean = true;
  let glowPeriod: number = GlowPeriodRange.default;
  let ledMode: boolean = false;
</script>

<div class="page">
  <div class="header">
    <h1>Color Simulator</h1>
  </div>

  <div class="content">
    <div class="color_simulator_container">
      <ColorSimulator brightness={brightness} colorTemperature={colorTemperature} filterStrength={filterStrength} bloom={bloom} glow={glow} glowPeriod={glowPeriod} ledMode={ledMode}></ColorSimulator>
    </div>

    <div class="color_controls_container">
      <ColorControls bind:brightness={brightness} bind:colorTemperature={colorTemperature} bind:filterStrength={filterStrength} bind:bloom={bloom} bind:glow={glow} bind:glowPeriod={glowPeriod} bind:ledMode={ledMode}></ColorControls>
    </div>
  </div>
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
    /* height: 100%; */
    /* margin: 8px;
    padding: 8px; */
  }
  .header {
    box-sizing: border-box;
    padding: 0px 8px 0px 8px;
    margin: 0px 8px 0px 8px;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 10%;
    max-height: 10%;
  }
  .content {
    box-sizing: border-box;
    overflow: visible;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 85vh;
    gap: 20px;
  }

  .color_simulator_container {
    overflow: visible;
    box-sizing: border-box;
    display: flex;
    /* flex-basis: 60%;
    max-height: 60%; */
    flex-shrink: 1;
    flex-grow: 1;
  }

  .color_controls_container {
    margin-bottom: 1em;
    box-sizing: border-box;
    flex-shrink: 1;
    flex-grow: 1;
  }

</style>
