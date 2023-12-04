import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  rotate = (input: string): string => {
    const chars = input.split("");
    for (let i = chars.length - 1; i >= 0; i--) {
      if (chars[i] === "z") {
        chars[i] = "a";
      } else {
        chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
        break;
      }
    }
    return chars.join("");
  };

  isValid = (input: string): boolean => {
    if (/[iol]/.test(input)) return false;
    if (!/(.)\1.*(.)\2/.test(input)) return false;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 3; i <= alphabet.length; i++) {
      const run = alphabet.slice(i - 3, i);
      if (input.includes(run)) return true;
    }
    return false;
  };

  protected part1(input: string): SolverOutput {
    let valid = false;
    while (!valid) {
      input = this.rotate(input);
      valid = this.isValid(input);
    }

    return input;
  }

  protected part2(input: string): SolverOutput {
    let valid = false;
    while (!valid) {
      input = this.rotate(input);
      valid = this.isValid(input);
    }

    valid = false;
    while (!valid) {
      input = this.rotate(input);
      valid = this.isValid(input);
    }

    return input;
  }
}
