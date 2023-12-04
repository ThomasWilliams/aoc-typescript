import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    return input
      .split("\n")
      .map((n) => parseInt(n))
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    const changes = input.split("\n").map((n) => parseInt(n));
    let total = 0;
    const totalsFound = new Set<number>();

    let i = 0;
    while (!totalsFound.has(total)) {
      totalsFound.add(total);
      total += changes[i++];
      i %= changes.length;
    }

    return total;
  }
}
