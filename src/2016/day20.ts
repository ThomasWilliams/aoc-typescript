import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];
  ranges: [number, number][] = [];

  parseRanges(input: string) {
    input.split("\n").forEach((line) => {
      const [rangeMin, rangeMax] = line.split("-").map((n) => parseInt(n));
      const range: [number, number] = [rangeMin, rangeMax];

      for (let i = 0; i < this.ranges.length; i++) {
        const [min, max] = this.ranges[i];
        if (rangeMin < min || (rangeMin === min && rangeMax < max)) {
          this.ranges.splice(i, 0, range);
          return;
        }
      }

      this.ranges.push(range);
    });
  }

  protected part1(input: string): SolverOutput {
    this.parseRanges(input);
    let minIP = 0;

    for (const [min, max] of this.ranges) {
      if (minIP > max) {
        // continue;
      } else if (minIP >= min) {
        minIP = max + 1;
      } else {
        return minIP;
      }
    }
    return minIP;
  }

  protected part2(input: string): SolverOutput {
    this.parseRanges(input);
    let pointer = 0;
    let ipCount = 0;

    for (const [min, max] of this.ranges) {
      if (pointer > max) {
        // do nothing
        // continue;
      } else if (pointer >= min) {
        pointer = max + 1;
      } else {
        ipCount += min - pointer;
        pointer = max + 1;
      }
    }

    return ipCount;
  }
}
