import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  morph(input: string): string {
    const chars: Array<string | number> = [];
    let curr = "";
    let count = 0;
    for (const ch of input) {
      if (curr === ch) {
        count++;
      } else {
        if (count) {
          chars.push(count);
          chars.push(curr);
        }
        curr = ch;
        count = 1;
      }
    }
    chars.push(count);
    chars.push(curr);
    return chars.join("");
  }

  protected part1(input: string): SolverOutput {
    for (let i = 0; i < 40; i++) {
      input = this.morph(input);
    }
    return input.length;
  }

  protected part2(input: string): SolverOutput {
    for (let i = 0; i < 50; i++) {
      input = this.morph(input);
    }
    return input.length;
  }
}
