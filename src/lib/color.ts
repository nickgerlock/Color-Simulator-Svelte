import bezier from 'bezier-easing';
import { BrightnessRange } from './ranges';
import { identity } from './utils';
import { portion } from './portion';

const MAXIMUM_COLOR_VALUE = 1.0;

// TODO: brand type of color number
export type Color = {
  red: number,
  green: number,
  blue: number,
}

export function color(red: number, green: number, blue: number): Color {
  return {
    red,
    green,
    blue,
  }
}

export function scale(color: Color, scalar: number = 1.0, shouldClip: boolean = true) {
  return clip({
    red: color.red * scalar,
    green: color.green * scalar,
    blue: color.blue * scalar,
  }, shouldClip);
}

function clip(color: Color, shouldClip: boolean = true): Color {
  return color;
  if (!shouldClip) return color;
  // return color // TODO
  const largestChannelValue = Math.max(color.red, color.green, color.blue);
  if (largestChannelValue <= MAXIMUM_COLOR_VALUE) return color;

  return scale(color, 1 / largestChannelValue);
}

export function setBrightness(color: Color, targetBrightness = 0.5) {
  const brightness = getBrightness(color);
  if (brightness === 0) return color;

  return scale(color, targetBrightness / brightness);
}

export function getBrightness(color: Color) {
  return getEnergy(color) / (MAXIMUM_COLOR_VALUE * 3);
}

export function getEnergy(color: Color) {
  return color.red + color.green + color.blue;
}

export function mix(colorA: Color, colorB: Color, portionA: number = 0.5, shouldClip: boolean = true) {
  return addColors(scale(colorA, portionA, shouldClip), scale(colorB, 1 - portionA, shouldClip), shouldClip);
}

// Filter Strength goes from 0 to 1.
// Note: the logic of this function is somewhat artibrary, because we're trying
// to make 

// Note: typically, the way to intersect two colors would be to simply multiply
// their two reflectance curves. However, it is not possible to do this in RGB
// while preserving the desired property of making multiple applications of
// the same filter have no effect. (This becomes apparent when working with colors
// like orange which do not have equal magnitudes for each channel).
// 
// So, we instead perform calculations on normalized versions of the input
// and filter, so that taking minimums acts as a reasonable approximation 
// for for multiplying the values.
export function filter(input: Color, filter: Color, brightness: number = 1.0, filterStrength: number = 0.5, shouldClip = false): Color {
  if (filterStrength < 0 || filterStrength > 1) {
    throw new Error("Filter strength must be between 0 and 1");
  }

  const inputMaxChannel = getMaxChannelValue(input);
  const inputMaximized = scale(input, 1 / inputMaxChannel);
  const filterMaxChannel = getMaxChannelValue(filter);
  const filterMaximized = scale(filter, 1 / filterMaxChannel);
  const filtered = scale(color(
    Math.min(inputMaximized.red, filterMaximized.red),
    Math.min(inputMaximized.green, filterMaximized.green),
    Math.min(inputMaximized.blue, filterMaximized.blue),
  ), inputMaxChannel, shouldClip);

 return scale(mix(filtered, input, filterStrength, shouldClip), brightness, shouldClip);
}

function getMaxChannelValue(color: Color) {
  return Math.max(color.red, color.green, color.blue);
}

function transparancyCurve(relativeBrightness: number): number {
  return Math.min(bezier(.31, 1.04, .05, 1.65)(relativeBrightness), 1.0);
}

// Source: https://stackoverflow.com/a/596241
export function getPerceivedLightness(luminance: number) {
  // Send this function a luminance value between 0.0 and 1.0,
  // and it returns L* which is "perceptual lightness"

  if (luminance <= (216 / 24389)) {       // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
    return luminance * (24389 / 27);  // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
  } else {
    return Math.pow(luminance, (1 / 3)) * 116 - 16;
  }
}

export function getLuminance(color: Color) {
  return 0.2126 * getLinearizedChannel(color.red) + 0.7152 * getLinearizedChannel(color.green) + 0.0722 * getLinearizedChannel(color.blue);
}

export function colorString(color: Color, opacity: number = 1): string {
  const useHDR = true;
  const colorSpace = useHDR ? 'display-p3' : 'srgb';

  // return `rgb(${color.red * 100}% ${color.green * 100}% ${color.blue * 100}% / ${opacity})`;
  // return `${colorSpace}(${color.red * 100}% ${color.green * 100}% ${color.blue * 100}% / ${opacity})`;
  return `color(${colorSpace} ${color.red} ${color.green} ${color.blue} / ${opacity})`;
}

function getLinearizedChannel(colorChannel: number) {
  const decimalColorChannel =colorChannel / MAXIMUM_COLOR_VALUE
  if (decimalColorChannel <= 0.04045) {
    return decimalColorChannel / 12.92;
  } else {
    return Math.pow(((decimalColorChannel + 0.055) / 1.055), 2.4);
  }
}

function addColors(colorA: Color, colorB: Color, shouldClip: boolean = true) {
  return clip({
    red: colorA.red + colorB.red,
    green: colorA.green + colorB.green,
    blue: colorA.blue + colorB.blue,
  }, shouldClip);
}
