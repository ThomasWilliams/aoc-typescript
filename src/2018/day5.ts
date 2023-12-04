import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = ["dabAcCaCBAcCcaDA"];

  getPolymerLength(polymer: string): number {
    const units: number[] = polymer.split("").map((ch) => ch.charCodeAt(0));

    let i = 0;
    while (i < units.length) {
      if (Math.abs(units[i] - units[i + 1]) === 32) {
        units.splice(i, 2);
        i = Math.max(0, i - 1);
      } else {
        i++;
      }
    }

    return units.length;
  }

  protected part1(input: string): SolverOutput {
    return this.getPolymerLength(input);
  }

  protected part2(input: string): SolverOutput {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((ch) =>
        this.getPolymerLength(input.replaceAll(new RegExp(ch, "ig"), "")),
      )
      .reduce((a, b) => Math.min(a, b));
  }
}
