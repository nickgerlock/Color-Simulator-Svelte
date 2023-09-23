<script lang="ts">
  import ColorControls from './color_controls.svelte';
  import ColorSimulator from './color_simulator.svelte';
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange } from './lib/ranges';

  let brightness: number = BrightnessRange.default;
  let colorTemperature: number = ColorTemperatureRange.default;
  let filterStrength: number = FilterStrengthRange.default;
</script>

<div class="page">
  <div class="header">
    <h1>Color Simulator</h1>
  </div>

  <div class="content">
    <div class="color_simulator_container">
      <ColorSimulator brightness={brightness} colorTemperature={colorTemperature} filterStrength={filterStrength}></ColorSimulator>
    </div>

    <hr>

    <div class="color_controls_container">
      <ColorControls bind:brightness={brightness} bind:colorTemperature={colorTemperature} bind:filterStrength={filterStrength}></ColorControls>
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
    height: 100%;
    margin: 8px;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }
  .header {
    flex-grow: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: 800px;
  }

  .color_simulator_container {
    display: flex;
    padding-top: 4vh;
    padding-bottom: 4vh;
    flex-grow: 1;
  }

  .color_controls_container {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-grow: 1;
  }

  hr {
    border-color: var(--border-color);
    border-width: 0.5px;
    width: 200vw;
    position: relative;
    left: -50vw;
  }
</style>
