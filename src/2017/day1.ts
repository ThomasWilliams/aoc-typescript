import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const digits = input.split("").map((d) => parseInt(d));

    return digits.reduce((sum, curr, i) => {
      const prev = digits.at(i - 1);
      return (sum += prev === curr ? curr : 0);
    }, 0);
  }

  protected part2(input: string): SolverOutput {
    const digits = input.split("").map((d) => parseInt(d));

    const half = digits.length / 2;
    return (
      digits
        .slice(0, half)
        .filter((digit, i) => digit === digits[i + half])
        .reduce((a, b) => a + b) * 2
    );
  }
}
