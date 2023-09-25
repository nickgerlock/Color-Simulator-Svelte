import type { Color } from './color';
import { filter, scaleColor } from './color';

export function getLightColors(lightSource: Color, color: Color, filterStrength: number = 1.0): {low: Color, mid: Color, high: Color} {
  return {
    low: scaleColor(filter(lightSource, color, filterStrength * 1.0), 0.8),
    mid: scaleColor(filter(lightSource, color, filterStrength * 0.8), 1.2),
    high: scaleColor(filter(lightSource, color, filterStrength * 0.4), 1.4),
  };
}
