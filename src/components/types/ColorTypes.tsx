export type ColorType = {
  id: number;
  name: string;
  hex: string;
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  lightness: number;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  hue: number;
  sat: number;
  light: number;
};
