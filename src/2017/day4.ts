import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  isAnagram = (word1: string, word2: string): boolean =>
    word1.split("").sort().join("") === word2.split("").sort().join("");

  protected part1(input: string): SolverOutput {
    return input.split("\n").filter((line) => {
      const words = line.split(/[\s]+/);
      for (const [i, word1] of words.entries()) {
        for (const word2 of words.slice(i + 1)) {
          if (word1 === word2) return false;
        }
      }
      return true;
    }).length;
  }

  protected part2(input: string): SolverOutput {
    return input.split("\n").filter((line) => {
      const words = line.split(/[\s]+/);
      for (const [i, word1] of words.entries()) {
        for (const word2 of words.slice(i + 1)) {
          if (this.isAnagram(word1, word2)) return false;
        }
      }
      return true;
    }).length;
  }
}
