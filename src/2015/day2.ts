import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = ["2x3x4", "1x1x10"];

  protected part1(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const [n1, n2, n3] = line
          .split("x")
          .map(Number)
          .sort((a, b) => a - b);
        this.debug(n1, n2, n3);
        return 3 * n1 * n2 + 2 * n1 * n3 + 2 * n2 * n3;
      })
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const [n1, n2, n3] = line
          .split("x")
          .map(Number)
          .sort((a, b) => a - b);
        this.debug(n1, n2, n3);
        return 2 * n1 + 2 * n2 + n1 * n2 * n3;
      })
      .reduce((a, b) => a + b);
  }
}
