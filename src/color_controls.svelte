<script lang="ts">
  import type { PresetKey } from './presets';
  import { getAllColorOptions, type ColorOptionKey } from './color_options';
  import { debounce } from './lib/utils';
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange, BloomRange, GlowPeriodRange } from "./lib/ranges";
  import { isPreset, getPreset, getAllPresets, getPresetLabel } from './presets';
  import RangeControl from "./range_control.svelte"
  import SelectControl from './select_control.svelte';
  import CheckboxControl from './checkbox_control.svelte';

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

<div class="controls_container">
  <div class="control_group basic">

    <div class="section">
      <SelectControl name="mode" label="Mode" options={getPresetOptions()} onChange={setPreset}></SelectControl>

      <div class="minor_divider" role="separator"></div>

      <SelectControl bind:value={colorOption} name="color_option" label="Colors" options={getColorOptions()}></SelectControl>
    </div>

    <div class="section">
      <RangeControl bind:value={brightness} name="brightness" label="Brightness" rangeParameters={BrightnessRange}></RangeControl>

      <div class="minor_divider" role="separator"></div>

      <CheckboxControl bind:checked={glow} name="glow" label="Shimmer"></CheckboxControl>
    </div>
  </div>

  {#if showAdvanced}
    <div class="section">
      <div class="control_group advanced">
        <RangeControl bind:value={colorTemperature} disabled={ledMode} name="colorTemperature" label="Color Temperature" rangeParameters={ColorTemperatureRange}></RangeControl>

        <div class="minor_divider" role="separator"></div>

        <RangeControl bind:value={filterStrength} disabled={ledMode} name="filterStrength" label="Filter Strength" rangeParameters={FilterStrengthRange}></RangeControl>

        <div class="minor_divider" role="separator"></div>

        <RangeControl disabled={!glow} bind:value={glowPeriod} name="glowPeriod" label="Shimmer Time" rangeParameters={GlowPeriodRange}></RangeControl>

        <div class="minor_divider" role="separator"></div>

        <!-- <RangeControl bind:value={bloom} name="bloom" label="Bloom" rangeParameters={BloomRange}></RangeControl> -->

        <CheckboxControl bind:checked={ledMode} name="led_mode" label="LED Mode"></CheckboxControl>
      </div>
    </div>
    <button class="text_button advanced_toggle" on:click={(e) => showAdvanced = false}>Hide Advanced</button>
  {:else}
    <button class="text_button advanced_toggle" on:click={(e) => showAdvanced = true}>Advanced</button>
  {/if}

  </div>

<style>
  .controls_container {
    margin: auto;
    margin-bottom: 0px;
    margin-top: auto;

    width: 20em;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    overflow: auto;
    box-sizing: border-box;
    background-color: #222222;
    border-radius: 10px;
    padding: 1em;
  }

  .section {
    border: solid 0.5px #505050;
    border-radius: 5px;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .minor_divider {
    width: 100%;
    border: solid 0.5px #303030;
  }

  .control_group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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

  .control label {
    text-align: center;
  }

  @media (min-aspect-ratio: 1) {
    .controls_container {
      margin-top: 4em;
      margin-bottom: auto;
    }
  }


</style>
