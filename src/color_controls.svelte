<script lang="ts">
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange } from './lib/ranges';
  import RangeControl from './range_control.svelte'

  export let brightness: number = BrightnessRange.default;
  export let colorTemperature: number = ColorTemperatureRange.default;
  export let filterStrength: number = FilterStrengthRange.default;
</script>

<div class="controls">
  <RangeControl bind:value={brightness} name="brightness" label="Brightness" rangeParameters={BrightnessRange}></RangeControl>

  <RangeControl bind:value={colorTemperature} name="colorTemperature" label="Color Temperature" rangeParameters={ColorTemperatureRange}></RangeControl>

  <RangeControl bind:value={filterStrength} name="filterStrength" label="Filter Strength" rangeParameters={FilterStrengthRange}></RangeControl>
</div>

<style>
  .controls {
    margin: auto;
    font-size: larger;
  }
</style>
