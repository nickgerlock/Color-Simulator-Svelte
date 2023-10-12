import type { Color } from './lib/color';
import { scale } from './lib/color';
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
  Purple,

  Azure,
  LedOrange,
  Pink,
  LightBlue,
  HotPink,
  Violet,
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
  'rainbow',
  'warm',
  'cool',
  'trans',
  'full_pallette',
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
  rainbow: {
    label: "Rainbow",
    colors: [
      Red,
      Orange,
      Yellow,
      Green,
      Blue,
      Purple,
      Violet,
    ],
  },
  warm: {
    label: "Warm",
    colors: [
      Red,
      Orange,
      Yellow,
      Red,
      Orange,
      Yellow,
    ],
  },
  cool: {
    label: "Cool",
    colors: [
      Blue,
      Green,
      Purple, Blue,
      Green,
      Purple,
    ],
  },
  trans: {
    label: "Trans Rights",
    colors: [
      Azure,
      HotPink,
      White,
      HotPink,
      Azure,
    ],
  },
  full_pallette: {
    label: "SMPTE Colors",
    colors: [
      White,
      Yellow,
      Cyan,
      Green,
      Magenta,
      Red,
      Blue,
    ].map((color) => scale(color, 0.75)),
  }
};
