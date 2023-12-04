import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  getSafeCount(input: string, rowCount: number): number {
    let row = input.split("");
    let safeCount = 0;

    for (let i = 0; i < rowCount; i++) {
      safeCount += row.filter((ch) => ch === ".").length;
      row = row.map((_, j, arr) => {
        return (arr[j - 1] === "^" && arr[j + 1] !== "^") ||
          (arr[j - 1] !== "^" && arr[j + 1] === "^")
          ? "^"
          : ".";
      });
    }

    return safeCount;
  }

  protected part1(input: string): SolverOutput {
    return this.getSafeCount(input, 40);
  }

  protected part2(input: string): SolverOutput {
    return this.getSafeCount(input, 400000);
  }
}
