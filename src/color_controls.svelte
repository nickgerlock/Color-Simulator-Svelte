<script lang="ts">
  import type { Preset } from './presets';
  import { debounce } from './lib/utils';
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange, BloomRange, GlowPeriodRange } from "./lib/ranges";
  import { isPreset, getPreset, getAllPresets, getPresetLabel } from './presets';
  import RangeControl from "./range_control.svelte"

  export let brightness: number = BrightnessRange.default;
  export let colorTemperature: number = ColorTemperatureRange.default;
  export let filterStrength: number = FilterStrengthRange.default;
  export let bloom: number = BloomRange.default;
  export let glow: boolean = false;
  export let ledMode: boolean = false;
  export let glowPeriod: number = GlowPeriodRange.default;
  export let preset: Preset = "incandescent";

  let showAdvanced = false;

  function setPreset(selectedPreset: string): void {
    if (!isPreset(selectedPreset)) return;

    preset = selectedPreset;
    const settings = getPreset(preset);

    brightness = settings.brightness ?? brightness;
    colorTemperature = settings.colorTemperature ?? colorTemperature;
    filterStrength = settings.filterStrength ?? filterStrength;
    glow = settings.glow ?? glow;
    ledMode = settings.ledMode ?? ledMode;
  }

  const setGlowPeriod = debounce((e: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    debugger
    // @ts-ignore
    const currentGlowPeriod = e[0].target.value

    glowPeriod;

    console.log("SETTING GLOW PERIOD")
    console.log(glowPeriod)
    glowPeriod = currentGlowPeriod;
  }, 50);
</script>

<div class="controls container">
  <div class="basic controls">
    <div class="mode dropdown control">
      <div class="wrapper">
        <label for="mode">Mode</label>
        <select on:input={(e) => setPreset(e.currentTarget.value)} name="mode">
          {#each getAllPresets() as preset}
            <option value={preset}>
              {getPresetLabel(preset)}
            </option>
          {/each}
        </select>
      </div>
    </div>

    <RangeControl bind:value={brightness} name="brightness" label="Brightness" rangeParameters={BrightnessRange}></RangeControl>

    <div class="glow checkbox control">
      <div class="wrapper">
        <label for="glow">Shimmer</label>
        <input bind:checked={glow} type="checkbox" id=glow name=glow/>
      </div>
    </div>
  </div>

  {#if showAdvanced}
    <button class="text_button advanced_toggle" on:click={(e) => showAdvanced = false}>Hide Advanced</button>

    <div class="advanced controls">
      <RangeControl bind:value={colorTemperature} disabled={ledMode} name="colorTemperature" label="Color Temperature" rangeParameters={ColorTemperatureRange}></RangeControl>

      <RangeControl bind:value={filterStrength} disabled={ledMode} name="filterStrength" label="Filter Strength" rangeParameters={FilterStrengthRange}></RangeControl>

      <RangeControl disabled={!glow} bind:value={glowPeriod} name="glowPeriod" label="Shimmer Time" rangeParameters={GlowPeriodRange}></RangeControl>

      <!-- <RangeControl bind:value={bloom} name="bloom" label="Bloom" rangeParameters={BloomRange}></RangeControl> -->

      <div class="led_mode checkbox control">
        <div class="wrapper">
          <label for="led_mode">LED Mode</label>
          <input bind:checked={ledMode} type="checkbox" id=led_mode name=led_mode/>
        </div>
      </div>
    </div>
  {:else}
    <button class="text_button advanced_toggle" on:click={(e) => showAdvanced = true}>Advanced</button>
  {/if}

  </div>

<style>
  .controls.container {
    margin: auto;
    margin-top: 0px;
    max-width: 300px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    box-sizing: border-box;
    background-color: #222222;
    border-radius: 10px;
    padding: 1em;
  }

  .control {
    margin: auto;
    width: 100%;
  }

  .text_button {
    width: 200px;
    background: none;
    border: 0;
    cursor: pointer; 
    margin: auto;
    text-decoration: underline;
    color: #CCCCCC;
  }

  .advanced_toggle {
    margin-top: 1em;
  }

  .dropdown.control label {
    display: block;
    width: 100%;
  }

  .dropdown.control select {
    display: block;
    width: 100%;
    text-align: center;
  }

  .dropdown.control {
    margin-bottom: 2em;
  }

  .control .wrapper {
    display: block;
    margin: auto;
    width: 14em;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
  }

  .control label {
    text-align: center;
  }
  .control input {
    margin: auto;
    width: 1.5em;
    height: 1.5em;
    position: relative;
    top: 4px;
    float: right;
  }

  .control select {
    margin: auto;
    position: relative;
    top: 4px;
    float: right;
  }
</style>
