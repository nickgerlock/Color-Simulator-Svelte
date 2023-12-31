export function identity<T>(t: T): T {
  return t;
}

export function partition<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
  const numChunks = Math.ceil(array.length / chunkSize);
  return new Array(numChunks).fill(undefined).map((_, chunkIndex) => {
    return array.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
  });
};

export function repeat<T>(item: T, numRepetitions : number = 1): Array<T> {
  return new Array(numRepetitions).fill(item);
}

export function repeatArray<T>(array: Array<T>, numRepetitions: number = 1): Array<T> {
  return repeat(array, numRepetitions).flat();
}

export function rotate<T>(array: Array<T>, rotationAmount: number = 0): Array<T> {
  return array.map((_, index) => {
    return array[(index - rotationAmount + array.length) % array.length];
  });
}

/**
 * 
 * @param a - Any number.
 * @param b - Any number
 * @param t - Ranges from 0 to 1.
 */
export function interpolate(a: number, b: number, t: number): number {
  return (a * (1 - t) + (b * t));
}


export function debounce<F extends (...args: any) => any>(f: F, ms: number) {
  let timer: number;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(args);
    }, ms);
  };
};
