type Brand<K, T> = K & { __brand: T }; // TODO: define elsewhere?

export type Portion = Brand<number, "Portion">;

export function portion(value: number) {
  if (value < 0 || value > 1) throw new Error(`Portion must be between 0 and 1 (got ${value})`);

  return value as Portion;
}
