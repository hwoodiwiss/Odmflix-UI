type Colour = [number, number, number];

const green: Colour = [25, 169, 116];
const red: Colour = [255, 65, 54];
const purple: Colour = [94, 44, 165];
const yellow: Colour = [255, 200, 50];
const blue: Colour = [66, 153, 191];

export function ColourToRgb(colour: Colour): string {
  return `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
}

export function ColourToRgba(colour: Colour, opacity: number): string {
  return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${opacity})`;
}

export const datasetColours = [green, red, purple, yellow, blue];
