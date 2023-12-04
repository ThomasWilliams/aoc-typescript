import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [
    "(())",
    "()()",
    "(((",
    "(()(()(",
    "))(((((",
    "())",
    "))(",
    ")))",
    ")())())",
  ];

  protected part1(input: string): SolverOutput {
    return input
      .split("")
      .map((ch) => (ch === "(" ? 1 : -1) as number)
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    let floor = 0;
    for (const [i, ch] of [...input].entries()) {
      if (ch === "(") floor++;
      if (ch === ")") floor--;
      if (floor < 0) return i + 1;
    }
    throw new Error();
  }
}
