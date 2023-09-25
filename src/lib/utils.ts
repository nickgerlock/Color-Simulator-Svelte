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
