import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    return input.split("\n").filter((line) => {
      const sides = line
        .trim()
        .split(/[\s]+/)
        .map((n) => parseInt(n));
      for (let i = 0; i < sides.length; i++) {
        if (
          (sides.at(i) ?? 0) >=
          (sides.at(i - 1) ?? 0) + (sides.at(i - 2) ?? 0)
        ) {
          return false;
        }
      }
      return true;
    }).length;
  }

  protected part2(input: string): SolverOutput {
    const nums: number[][] = input.split("\n").map((line) =>
      line
        .trim()
        .split(/[\s]+/)
        .map((n) => parseInt(n)),
    );

    const triangles: number[][] = [];
    for (let row = 0; row < nums.length; row += 3) {
      for (let col = 0; col < nums[row].length; col++) {
        triangles.push([
          nums[row][col],
          nums[row + 1][col],
          nums[row + 2][col],
        ]);
      }
    }

    return triangles.filter((sides) => {
      for (let i = 0; i < sides.length; i++) {
        if (
          (sides.at(i) ?? 0) >=
          (sides.at(i - 1) ?? 0) + (sides.at(i - 2) ?? 0)
        ) {
          return false;
        }
      }
      return true;
    }).length;
  }
}
