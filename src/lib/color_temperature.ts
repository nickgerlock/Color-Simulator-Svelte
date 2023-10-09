import type { Color } from './color';
import type { Easing } from './easing';

import { BrightnessRange } from './ranges';

import { color, mix, scale } from './color';
import { ease, inverseEase } from './easing';
import bezier from 'bezier-easing';
import { interpolate } from './utils';

export type ColorTemp = [number, Color];

export function getColorByTemperature(kelvin: number): Color {
  const leftSide = Array.from(ColorTemps).reverse().find(targetColorTemp => targetColorTemp[0] <= kelvin) || MinColorTemp;
  const rightSide = Array.from(ColorTemps).find(targetColorTemp => targetColorTemp[0] > kelvin) || MaxColorTemp;
  if (leftSide === rightSide) return leftSide[1];

  const progressFromLeftToRight = (kelvin - leftSide[0]) / (rightSide[0] - leftSide[0]);

  return mix(leftSide[1], rightSide[1], 1 - progressFromLeftToRight);
}

/**
 * 
 * @param relativeTemperature - between 0 and 1.
 */
export function getColorByRelativeTemperature(relativeTemperature: number) {
  const kelvin = (MinColorTemp[0] * (1 - relativeTemperature)) + (MaxColorTemp[0] * relativeTemperature);
  return getColorByTemperature(kelvin);
}

export type TemperatureVariantLightSource = {
  startTemperature: number
  endTemperature: number
  easing: Easing,
}

export const Incandescent: TemperatureVariantLightSource = {
  startTemperature: 1000,
  endTemperature: 5000,
  easing: (number: number) => number,
}

const DEFAULT_TEMPERATURE_RANGE = 1000;
export function tempatureVariantLightSource(centerTemperature: number, range: number = DEFAULT_TEMPERATURE_RANGE, easing?: Easing): TemperatureVariantLightSource {
  return {
    startTemperature: centerTemperature - range,
    endTemperature: centerTemperature + range,
    easing: easing ?? ((number: number) => number),
  };
}

export function getColorFromTemperatureVariantLightSource(lightSource: TemperatureVariantLightSource, brightness: number) {
  const MAX_BRIGHTNESS = BrightnessRange.max;
  const brightnessPortion = brightness / MAX_BRIGHTNESS;
  const targetTemperature = interpolate(lightSource.startTemperature, lightSource.endTemperature, lightSource.easing(brightnessPortion));

  return scale(getColorByTemperature(targetTemperature), brightness);
}

export function getColorByTemperatureWithBrightness(centerTemperature: number, brightness: number = 1.0) {
  // TODO import this
  const MAX_BRIGHTNESS = 10;
  const TEMPERATURE_RANGE_PER_UNIT_BRIGHTNESS = 2000;
  // const TEMPERATURE_VARIANCE_PROGRESS_RANGE = 1; // TODO likely change this

  const relativeCenterTemperature = centerTemperature / (MaxColorTemp[0] - MinColorTemp[0]);
  const minimumRelativeTemperatureByBrightness = 0;
  const maximumRelativeTemperatureByBrightness = 1;

  const progressByBrightness = ease(brightness / MAX_BRIGHTNESS);
  const targetTemperatureProgress = (minimumRelativeTemperatureByBrightness * (1 - progressByBrightness)) + (maximumRelativeTemperatureByBrightness * progressByBrightness)

  return getColorByRelativeTemperature(targetTemperatureProgress);
}

function temperatureCurve(relativeBrightness: number): number {
  return bezier(0, 0.63, 0.48, 1.0)(relativeBrightness);
}

const ColorTemps = [
  [1_000, color(1.0, 0.2196078431372549, 0)],
  [2_000, color(1.0, 0.5764705882352941, 0.17254901960784313)],
  [3_300, color(1.0, 0.7450980392156863, 0.49411764705882355)],
  [4_000, color(1.0, 0.8196078431372549, 0.6392156862745098)],
  [5_500, color(1.0, 0.9254901960784314, 0.8784313725490196)],
  [7_000, color(0.9607843137254902, 0.9529411764705882, 1.0)],
  [10_000, color(0.8117647058823529, 0.8549019607843137, 1.0)],
  [12_000, color(0.7647058823529411, 0.8196078431372549, 1.0)],
] as const;

// TODO delete?
// type AvailableColorTemp = typeof ColorTemps[number][0]

const MinColorTemp = ColorTemps[0];
const MaxColorTemp = ColorTemps[ColorTemps.length - 1];
const ColorTempRange = MinColorTemp[0] - MaxColorTemp[0];
