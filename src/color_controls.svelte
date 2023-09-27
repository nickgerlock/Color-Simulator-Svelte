<script lang="ts">
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange, BloomRange } from './lib/ranges';
  import RangeControl from './range_control.svelte'

  export let brightness: number = BrightnessRange.default;
  export let colorTemperature: number = ColorTemperatureRange.default;
  export let filterStrength: number = FilterStrengthRange.default;
  export let bloom: number = BloomRange.default;
  export let glow: boolean = false;
</script>

<div class="controls">
  <RangeControl bind:value={brightness} name="brightness" label="Brightness" rangeParameters={BrightnessRange}></RangeControl>

  <RangeControl bind:value={colorTemperature} name="colorTemperature" label="Color Temperature" rangeParameters={ColorTemperatureRange}></RangeControl>

  <RangeControl bind:value={filterStrength} name="filterStrength" label="Filter Strength" rangeParameters={FilterStrengthRange}></RangeControl>

  <!-- <RangeControl bind:value={bloom} name="bloom" label="Bloom" rangeParameters={BloomRange}></RangeControl> -->

  <div class="glow control">
    <div class="wrapper">
      <label for="glow">Glow</label>
      <input bind:checked={glow} type="checkbox" id=glow name=glow/>
    </div>
  </div>
</div>

<style>
  .controls {
    margin: auto;
    margin-bottom: 6em;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .glow.control {
    margin: auto;
  }

  .glow.control .wrapper {
    display: block;
    margin: auto;
    width: 6em;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
  }

  .glow.control label {
    text-align: center;
  }
  .glow.control input {
    margin: auto;
    width: 1.5em;
    height: 1.5em;
    position: relative;
    top: 4px;
  }
</style>
