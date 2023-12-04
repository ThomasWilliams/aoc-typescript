import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    let depth = 0;
    let score = 0;
    let garbage = false;
    let canceled = false;
    for (const ch of input) {
      if (garbage) {
        if (canceled) {
          canceled = false;
        } else if (ch === "!") {
          canceled = true;
        } else if (ch == ">") {
          garbage = false;
        }
        continue;
      }
      if (ch == "{") {
        depth += 1;
      } else if (ch == "}") {
        score += depth;
        depth -= 1;
      } else if (ch == "<") {
        garbage = true;
      }
    }
    return score;
  }

  protected part2(input: string): SolverOutput {
    let count = 0;
    let garbage = false;
    let canceled = false;
    for (const ch of input) {
      if (!garbage) {
        if (ch === "<") {
          garbage = true;
        }
      } else if (canceled) {
        canceled = false;
      } else if (ch === "!") {
        canceled = true;
      } else if (ch == ">") {
        garbage = false;
      } else {
        count += 1;
      }
    }
    return count;
  }
}
