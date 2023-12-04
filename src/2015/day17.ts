import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [];
  arrangements: number[][] = [];

  findArrangements(
    target: number,
    remainingUnits: number[],
    currentArrangement: number[],
  ) {
    if (target < 0) {
      return;
    } else if (target === 0) {
      this.arrangements.push(currentArrangement.slice());
    } else if (remainingUnits.length) {
      const topUnit = remainingUnits[0];
      this.findArrangements(
        target - topUnit,
        remainingUnits.slice(1),
        currentArrangement.concat(topUnit),
      );

      this.findArrangements(
        target,
        remainingUnits.slice(1),
        currentArrangement,
      );
    }
  }

  protected part1(input: string): SolverOutput {
    const lines = input.split("\n");
    const units = lines.map((line) => parseInt(line)).sort((a, b) => b - a);

    this.findArrangements(150, units, []);
    return this.arrangements.length;
  }

  protected part2(input: string): SolverOutput {
    const lines = input.split("\n");
    const units = lines.map((line) => parseInt(line)).sort((a, b) => b - a);

    this.findArrangements(150, units, []);

    let min = Number.POSITIVE_INFINITY;
    let count = 0;

    for (const arrangement of this.arrangements) {
      if (arrangement.length === min) {
        count++;
      }

      if (arrangement.length < min) {
        min = arrangement.length;
        count = 1;
      }
    }

    return count;
  }
}
