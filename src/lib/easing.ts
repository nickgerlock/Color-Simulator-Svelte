import bezier from 'bezier-easing';

export type Easing = (number: number) => number;

export function ease(number: number) {
  return bezier(0.25, 0.1, 0.25, 0.1)(number);
}

export function inverseEase(number: number) {
  return bezier(0, .5, 1, .5)(number);
}

export function easeIn(number: number) {
  return bezier(0.42, 0.0, 1.0, 1.0)(number);
}

export function easeOut(number: number) {
  return bezier(0.0, 0.0, 0.58, 1.0)(number);
}

export function easeInOut(number: number) {
  return bezier(0.42, 0.0, 0.58, 1.0)(number);
}
