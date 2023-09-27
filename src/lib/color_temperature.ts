import { color, mix } from './color';
import type { Color } from './color';
export type ColorTemp = [number, Color];

export function temperatureToRGB(kelvin: number): Color {
  const leftSide = Array.from(ColorTemps).reverse().find(targetColorTemp => targetColorTemp[0] <= kelvin) || MinColorTemp;
  const rightSide = Array.from(ColorTemps).find(targetColorTemp => targetColorTemp[0] > kelvin) || MaxColorTemp;
  if (leftSide === rightSide) return leftSide[1];

  const progressFromLeftToRight = (kelvin - leftSide[0]) / (rightSide[0] - leftSide[0]);

  return mix(leftSide[1], rightSide[1], 1 - progressFromLeftToRight);
}

const ColorTemps = [
  [1000, color(1.0, 0.2196078431372549, 0)],
  [2000, color(1.0, 0.5764705882352941, 0.17254901960784313)],
  [3300, color(1.0, 0.7450980392156863, 0.49411764705882355)],
  [4000, color(1.0, 0.8196078431372549, 0.6392156862745098)],
  [5500, color(1.0, 0.9254901960784314, 0.8784313725490196)],
  [7000, color(0.9607843137254902, 0.9529411764705882, 1.0)],
  [10000, color(0.8117647058823529, 0.8549019607843137, 1.0)],
  [12000, color(0.7647058823529411, 0.8196078431372549, 1.0)],
] as const;

const MinColorTemp = ColorTemps[0];
const MaxColorTemp = ColorTemps[ColorTemps.length - 1];
