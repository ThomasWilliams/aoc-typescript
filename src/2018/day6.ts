import { AbstractSolver, SolverOutput } from "~solver";
import type { Coord } from "~util/coord";
import { calculateDistance } from "~util/manhattan-distance";

export default class Solver extends AbstractSolver {
  samples = [
    `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,
  ];
  coords: Coord[] = [];

  parseInput(input: string) {
    this.coords = input
      .split("\n")
      .map(
        (line) => line.split(", ").map((n) => parseInt(n)) as [number, number],
      );
  }

  findClosestCoordIndex(loc: Coord): number {
    let closestIndex = -1;
    let closestDistance = Infinity;
    for (const [i, coord] of this.coords.entries()) {
      const dist = calculateDistance(loc, coord);

      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = i;
      }

      if (dist === closestDistance && closestIndex !== i) {
        closestIndex = -1;
      }
    }
    return closestIndex;
  }

  findDistanceTotal(loc: Coord): number {
    return this.coords.reduce(
      (sum, coord) => sum + calculateDistance(loc, coord),
      0,
    );
  }

  protected part1(input: string): SolverOutput {
    this.parseInput(input);
    const areaSizes = new Array(this.coords.length).fill(0);
    const rowMax = this.coords.reduce((max, [row]) => Math.max(max, row), 0);
    const colMax = this.coords.reduce((max, [_, col]) => Math.max(max, col), 0);

    // find the infinities
    for (let col = 0; col <= colMax + 1; col++) {
      const top = this.findClosestCoordIndex([0, col]);
      if (top >= 0) areaSizes[top] = -Infinity;
      const bottom = this.findClosestCoordIndex([rowMax + 1, col]);
      if (bottom >= 0) areaSizes[bottom] = -Infinity;
    }

    for (let row = 0; row <= rowMax + 1; row++) {
      const left = this.findClosestCoordIndex([row, 0]);
      if (left >= 0) areaSizes[left] = -Infinity;
      const right = this.findClosestCoordIndex([row, colMax + 1]);
      if (right >= 0) areaSizes[right] = -Infinity;
    }

    // increment counts on the rest
    for (let row = 1; row <= rowMax; row++) {
      for (let col = 1; col <= colMax; col++) {
        const i = this.findClosestCoordIndex([row, col]);
        if (i >= 0) areaSizes[i]++;
      }
    }

    return Math.max(...areaSizes);
  }

  protected part2(input: string): SolverOutput {
    this.parseInput(input);
    const rowMax = this.coords.reduce((max, [row]) => Math.max(max, row), 0);
    const colMax = this.coords.reduce((max, [_, col]) => Math.max(max, col), 0);
    let count = 0;
    for (let row = 1; row <= rowMax; row++) {
      for (let col = 1; col <= colMax; col++) {
        if (this.findDistanceTotal([row, col]) < 10000) {
          count++;
        }
      }
    }
    return count;
  }
}
