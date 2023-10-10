<script lang="ts">
  import type { PresetKey } from './presets';
  import { getAllColorOptions, type ColorOptionKey } from './color_options';
  import { debounce } from './lib/utils';
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange, BloomRange, GlowPeriodRange } from "./lib/ranges";
  import { isPreset, getPreset, getAllPresets, getPresetLabel } from './presets';
  import RangeControl from "./range_control.svelte"
    import SelectControl from './select_control.svelte';
    import { color } from './lib/color';

  export let brightness: number = BrightnessRange.default;
  export let colorTemperature: number = ColorTemperatureRange.default;
  export let filterStrength: number = FilterStrengthRange.default;
  export let bloom: number = BloomRange.default;
  export let glow: boolean = false;
  export let ledMode: boolean = false;
  export let glowPeriod: number = GlowPeriodRange.default;
  export let colorOption: ColorOptionKey = 'christmas';

  export let preset: PresetKey = "incandescent";

  let showAdvanced = false;

  function getPresetOptions() {
    return getAllPresets().map(preset => ({value: preset.key, label: preset.label}));
  }

  function getColorOptions() {
    return getAllColorOptions().map(colorOption => ({label: colorOption.label, value: colorOption.key}));
  }

  function setPreset(selectedPreset: string): void {
    if (!isPreset(selectedPreset)) return;

    preset = selectedPreset;
    const settings = getPreset(preset);

    brightness = settings.brightness ?? brightness;
    colorTemperature = settings.colorTemperature ?? colorTemperature;
    filterStrength = settings.filterStrength ?? filterStrength;
    glow = settings.glow ?? glow;
    ledMode = settings.ledMode ?? ledMode;
    colorOption = settings.colorOption ?? colorOption;
  }

  const setGlowPeriod = debounce((e: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
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
    <SelectControl name="mode" label="Mode" options={getPresetOptions()} onChange={setPreset}></SelectControl>

    <SelectControl bind:value={colorOption} name="color_option" label="Colors" options={getColorOptions()}></SelectControl>

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
    max-width: 300px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
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

</style>
