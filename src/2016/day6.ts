import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  getCharCounts(input: string): Array<{ [k: string]: number }> {
    const charCounts: Array<{ [k: string]: number }> = [];

    for (const line of input.split("\n")) {
      for (const [i, ch] of line.split("").entries()) {
        if (!charCounts[i]) charCounts[i] = {};
        if (!charCounts[i][ch]) charCounts[i][ch] = 0;
        charCounts[i][ch]++;
      }
    }

    return charCounts;
  }

  protected part1(input: string): SolverOutput {
    return this.getCharCounts(input)
      .map(
        (counts) =>
          Object.entries(counts)
            .sort(([_1, n1], [_2, n2]) => n2 - n1)
            .shift()
            ?.shift(),
      )
      .join("");
  }

  protected part2(input: string): SolverOutput {
    return this.getCharCounts(input)
      .map(
        (counts) =>
          Object.entries(counts)
            .sort(([_1, n1], [_2, n2]) => n1 - n2)
            .shift()
            ?.shift(),
      )
      .join("");
  }
}
