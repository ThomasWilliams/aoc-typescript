import { AbstractSolver, SolverOutput } from "~solver";

type Claim = {
  id: number;
  x0: number;
  y0: number;
  width: number;
  height: number;
};

export default class Solver extends AbstractSolver {
  samples = [];

  parseInput(input: string): Claim[] {
    return input.split("\n").map((line) => {
      const [id, x0, y0, width, height] = (line.match(/[\d]+/g) ?? []).map(
        (n) => parseInt(n),
      );
      return { id, x0, y0, width, height };
    });
  }

  protected part1(input: string): SolverOutput {
    const claims = this.parseInput(input);
    const fabric: number[][] = [...Array(1000).keys()].map((_) =>
      new Array(1000).fill(0),
    );

    for (const { x0, y0, width, height } of claims) {
      for (let x = x0; x < x0 + width; x++) {
        for (let y = y0; y < y0 + height; y++) {
          fabric[x][y]++;
        }
      }
    }

    return fabric
      .map((row) => row.filter((n) => n >= 2).length)
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    const claims = this.parseInput(input);
    for (const claim1 of claims) {
      let foundOverlap = false;
      for (const claim2 of claims) {
        if (claim1.id === claim2.id) continue;
        const [ax1, bx1, ay1, by1] = [
          claim1.x0,
          claim1.x0 + claim1.width,
          claim1.y0,
          claim1.y0 + claim1.height,
        ];
        const [ax2, bx2, ay2, by2] = [
          claim2.x0,
          claim2.x0 + claim2.width,
          claim2.y0,
          claim2.y0 + claim2.height,
        ];
        const xOverlap = ax1 <= bx2 && ax2 <= bx1;
        const yOverlap = ay1 <= by2 && ay2 <= by1;
        if (xOverlap && yOverlap) {
          foundOverlap = true;
          break;
        }
      }
      if (!foundOverlap) {
        return claim1.id;
      }
    }
    return 0;
  }
}
