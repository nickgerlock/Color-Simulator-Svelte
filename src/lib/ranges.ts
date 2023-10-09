export type RangeParameters = {
  min: number
  max: number
  default: number
  step: number
  list?: { value: number, label: string }[]
}

export const BrightnessRange: RangeParameters = {
  min: 0,
  max: 1.0,
  step: 0.01,
  default: 0.5,
  list: [
    {
      value: 0, label: "0%",
    },
    {
      value: 0.25, label: "25%",
    },
    {
      value: 0.5, label: "50%",
    },
    {
      value: 1.0, label: "100%",
    },
  ],
}

export const ColorTemperatureRange: RangeParameters = {
  min: 1_000,
  max: 10_000,
  step: 1,
  default: 4_000,
  list: [
    {
      value: 1_000, label: "1000k",
    },
    // {
    //   value: 3_250, label: "3250k",
    // },
    {
      value: 6_000, label: "6000k",
    },
    // {
    //   value: 8_250, label: "8250k",
    // },
    // {
    //   value: 10_000, label: "10000k",
    // },
    {
      value: 12_000, label: "12000k"
    },
  ],
}

export const BloomRange: RangeParameters = {
  min: 0,
  max: 1,
  step: 0.01,
  default: 1,
  list: [
    {
      value: 0.0, label: "0%",
    },
    {
      value: 0.5, label: "50%",
    },
    {
      value: 1.0, label: "100%",
    },
  ],
}

export const FilterStrengthRange: RangeParameters = {
  min: 0,
  max: 1,
  step: 0.01,
  default: 0.8,
  list: [
    {
      value: 0, label: "0%",
    },
    {
      value: 50, label: "50%",
    },
    {
      value: 100, label: "100%",
    },
  ],
}

export const GlowPeriodRange: RangeParameters = {
  min: 500, // TODO probably higher
  max: 16_000,
  step: 500,
  default: 8_000,
  list: [
    {
      value: 1_000, label: "1s",
    },
    {
      value: 8_000, label: "8s",
    },
    {
      value: 16_000, label: "16s",
    },
  ],
};
