import type { ColorOptionKey } from './color_options';
import { ColorTemperatureRange } from './lib/ranges';

export function getAllPresets(): Preset[] {
  return Presets.map(getPreset);
}

export function getPreset(preset: PresetKey): Preset {
  return Object.assign({key: preset}, PresetConfigs[preset]);
}

export function getPresetLabel(preset: PresetKey): string {
  return PresetConfigs[preset].label;
}

export function isPreset(preset: string): preset is PresetKey {
  return Presets.includes(preset as PresetKey);
}

export type PresetKey = typeof Presets[number];

type Settings = {
  brightness: number,
  colorTemperature: number,
  filterStrength: number,
  glow: boolean,
  ledMode: boolean,
  colorOption: ColorOptionKey,
}

type PresetConfig = Partial<Settings> & { label: string };
type PresetConfigs = Record<PresetKey, PresetConfig>;
type Preset = PresetConfig & { key: PresetKey };

const Presets = [
  'incandescent',
  'led',
  'warm_incandescent',
  'cool_incandescent',
  'true_beauty',
] as const;

const PresetConfigs: Record<PresetKey, PresetConfig> = {
  incandescent: {
    colorTemperature: ColorTemperatureRange.default,
    filterStrength: 0.8,
    ledMode: false,
    label: 'Incandescent',
  },

  led: {
    ledMode: true,
    label: 'LED',
  },

  warm_incandescent: {
    colorTemperature: 2000,
    filterStrength: 0.7,
    ledMode: false,
    label: 'Warm Incandescent',
    brightness: 0.55,
  },

  cool_incandescent: {
    colorTemperature: 10000,
    filterStrength: 0.7,
    ledMode: false,
    label: 'Cool Incandescent',
  },

  true_beauty : {
    colorTemperature: 2000,
    filterStrength: 0.6,
    brightness: 0.75,
    ledMode: false,
    glow: true,
    label: 'True Beauty',
    // colorOption: 'christmas',
  },
} as const;
