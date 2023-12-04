import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const { max, min } = line
          .split(/[\s]+/)
          .map((n) => parseInt(n))
          .reduce(
            ({ max, min }, num) => ({
              max: Math.max(max, num),
              min: Math.min(min, num),
            }),
            {
              max: 0,
              min: Number.POSITIVE_INFINITY,
            },
          );
        return max - min;
      })
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const digits = line.split(/[\s]+/).map((n) => parseInt(n));
        while (digits.length) {
          const d1 = digits.shift() ?? 1;
          for (const d2 of digits) {
            if ((d1 / d2) % 1 === 0) return d1 / d2;
            if ((d2 / d1) % 1 === 0) return d2 / d1;
          }
        }
        return 0;
      })
      .reduce((a, b) => a + b);
  }
}
