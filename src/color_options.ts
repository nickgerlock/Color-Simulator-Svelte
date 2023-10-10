import type { Color } from './lib/color';
import {
  White,
  Black,

  Red,
  Green,
  Blue,

  Yellow,
  Magenta,
  Cyan,

  Orange,
  Azure,
  LedOrange,
} from './lib/colors';

type FullColorOption = ColorOption & {key: ColorOptionKey};

export function getAllColorOptions(): FullColorOption[] {
  return ColorOptions.map(getColorOption);
}

export function getColorOption(colorOptionKey: ColorOptionKey): FullColorOption {
  return {
    ...ColorOptionConfigs[colorOptionKey],
    key: colorOptionKey,
  };
}

export function getColors(colorOption: ColorOptionKey): Color[] {
  return ColorOptionConfigs[colorOption].colors;
}

export type ColorOptionKey = typeof ColorOptions[number];

interface ColorOption {
  label: string,
  colors: Color[],
};


const ColorOptions = [
  'christmas',
  'test_pattern_colors',
  'red_white_and_blue',
] as const;

const ColorOptionConfigs: Record<ColorOptionKey, ColorOption> = {
  christmas: {
    label: "Holiday",
    colors: [
      Blue,
      Green,
      Orange,
      Red,
    ],
  },
  red_white_and_blue: {
    label: "Red White & Blue",
    colors: [
      Red,
      White,
      Blue,
      Red,
      White,
      Blue,
    ],
  },
  test_pattern_colors: {
    label: "Test Pallette",
    colors: [
      White,
      Red,
      Green,
      Blue,
      Yellow,
      Magenta,
      Cyan,
    ],
  }
};
