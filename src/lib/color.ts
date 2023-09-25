const MAXIMUM_COLOR_VALUE = 255;

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

export function scaleColor(color: Color, scalar: number = 1.0) {
  return {
    red: Math.floor(color.red * scalar),
    green: Math.floor(color.green * scalar),
    blue: Math.floor(color.blue * scalar),
  };
}

export function setBrightness(color: Color, targetBrightness = 0.5) {
  const brightness = getBrightness(color);
  if (brightness === 0) return color;

  return scaleColor(color, targetBrightness / brightness);
}

export function getBrightness(color: Color) {
  return getEnergy(color) / (MAXIMUM_COLOR_VALUE * 3);
}

export function getEnergy(color: Color) {
  return color.red + color.green + color.blue;
}

export function mix(colorA: Color, colorB: Color, portionA: number = 0.5) {
  return addColors(scaleColor(colorA, portionA), scaleColor(colorB, 1 - portionA));
}

// Filter Strength goes from 0 to 1.
export function filter(input: Color, filter: Color, filterStrength: number = 0.5): Color {
  if (filterStrength < 0 || filterStrength > 1) {
    throw new Error("Filter strength must be between 0 and 1");
  }

  const filtered = {
    red: Math.min(input.red, filter.red),
    green: Math.min(input.green, filter.green),
    blue: Math.min(input.blue, filter.blue),
  };

  return mix(filtered, input, filterStrength);
}

export function colorString(color: Color, opacity: number = 1): string {
  return `rgb(${color.red} ${color.green} ${color.blue} / ${opacity})`;
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

function getLinearizedChannel(colorChannel: number) {
  const decimalColorChannel =colorChannel / MAXIMUM_COLOR_VALUE
  if (decimalColorChannel <= 0.04045) {
    return decimalColorChannel / 12.92;
  } else {
    return Math.pow(((decimalColorChannel + 0.055) / 1.055), 2.4);
  }
}

function addColors(colorA: Color, colorB: Color) {
  return {
    red: colorA.red + colorB.red,
    green: colorA.green + colorB.green,
    blue: colorA.blue + colorB.blue,
  };
}
