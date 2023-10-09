import bezier from 'bezier-easing';
import type { Color } from './color';
import { filter, getBrightness, scale } from './color';

export function getLightColors(lightSource: Color, color: Color, brightness: number, filterStrength: number = 1.0):
  { low: Color, mid: Color, high: Color, glow: Color, glowBrightness: number }
  {
  const low = filter(lightSource, color, brightness * 0.8, filterStrength * 1.0);
  const mid = filter(lightSource, color, brightness * 1.2, filterStrength * 0.8);
  const high = filter(lightSource, color, brightness * 1.4, filterStrength * 0.4);
  const glow = low;
  const glowBrightness = getBrightness(glow);

  return {
    low,
    mid,
    high,
    glow,
    glowBrightness,
  }
}

// TODO: this is all unused.

function getAdjustedFilterStrength(filterStrength: number, brightness: number) {
  const clippedBrightness = Math.min(brightness, 1.0);
  return (1 - clippedBrightness) * filterStrength;
}

function getFilterStrength(brightness: number, baseFilterStrength: number): number {
  // const transparancyCurve = bezier(.31, 1.04, .62, .16);
  const transparancyCurve = (brightness: number) => brightness;
  const transparancyRange = [0.1, 0.25];

  const rawTransparancy =  Math.min(transparancyCurve(brightness), 1);
  const transparancy = transparancyRange[0] + (transparancyRange[1] * rawTransparancy);

  return baseFilterStrength * (1 - transparancy);
}
