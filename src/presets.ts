import { ColorTemperatureRange } from './lib/ranges';

export function getAllPresets(): readonly Preset[] {
  return Presets;
}

export function getPreset(preset: Preset) {
  return PresetConfigs[preset];
}

export function getPresetLabel(preset: Preset) {
  return PresetConfigs[preset].label;
}

export function isPreset(preset: string): preset is Preset {
  return Presets.includes(preset as Preset);
}

export type Preset = typeof Presets[number];

const Presets = [
  "incandescent",
  "led",
  "warm_incandescent",
  "true_beauty",
] as const;

type Settings = {
  brightness: number,
  colorTemperature: number,
  filterStrength: number,
  glow: boolean,
  ledMode: boolean,
}

type PresetConfig = Partial<Settings> & { label: string };
type PresetConfigs = Record<Preset, PresetConfig>;

const PresetConfigs: PresetConfigs = {
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
  },
  true_beauty: {
    colorTemperature: 2000,
    filterStrength: 0.6,
    brightness: 0.85,
    ledMode: false,
    glow: true,
    label: 'True Beauty',
  },
} as const;
