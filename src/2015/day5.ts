import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  protected part1(input: string): SolverOutput {
    return input
      .split("\n")
      .map(
        (line) =>
          (line.match(/[aeiou]/g) || []).length >= 3 &&
          /([a-z])\1/.test(line) &&
          !/(ab|cd|pq|xy)/.test(line),
      )
      .filter(Boolean).length;
  }

  protected part2(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => /([a-z]{2}).*\1/.test(line) && /([a-z]).\1/.test(line))
      .filter(Boolean).length;
  }
}
