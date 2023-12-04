import type { Coord } from "./coord";

export const calculateDistance = ([x1, y1]: Coord, [x2, y2]: Coord): number =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);
