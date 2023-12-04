import { AbstractSolver, SolverOutput } from "~solver";

class PasswordScrambler {
  chars: string[];

  constructor(chars: string[]) {
    this.chars = chars;
  }

  private swapPositions(x: number, y: number) {
    [this.chars[x], this.chars[y]] = [this.chars[y], this.chars[x]];
  }

  private swapLetters(a: string, b: string) {
    for (const [i, ch] of this.chars.entries()) {
      if (ch === a) this.chars[i] = b;
      if (ch === b) this.chars[i] = a;
    }
  }

  private rotateLeft(n: number) {
    const m = n % this.chars.length;
    this.chars = this.chars.slice(m).concat(this.chars.slice(0, m));
  }

  private rotateRight(n: number) {
    const m = this.chars.length - (n % this.chars.length);
    this.chars = this.chars.slice(m).concat(this.chars.slice(0, m));
  }

  private rotateByLetter(a: string) {
    const index = this.chars.indexOf(a);
    this.rotateRight(index >= 4 ? index + 2 : index + 1);
  }

  private reverse(x: number, y: number) {
    this.chars = this.chars
      .slice(0, x)
      .concat(this.chars.slice(x, y + 1).reverse(), this.chars.slice(y + 1));
  }

  private move(x: number, y: number) {
    const ch = this.chars.splice(x, 1).pop() ?? "";
    this.chars.splice(y, 0, ch);
  }

  private getLettersFromStep = (line: string): string[] =>
    (line.match(/ [a-z]([\s]|$)/g) ?? []).map((s) => s.trim());

  private getNumbersFromStep = (line: string): number[] =>
    (line.match(/[\d]+/g) ?? []).map((n) => parseInt(n));

  public scramble(steps: string[]) {
    for (const step of steps) {
      const [x, y] = this.getNumbersFromStep(step);
      const [a, b] = this.getLettersFromStep(step);

      if (step.startsWith("swap position")) {
        this.swapPositions(x, y);
      }

      if (step.startsWith("swap letter")) {
        this.swapLetters(a, b);
      }

      if (step.startsWith("rotate left")) {
        this.rotateLeft(x);
      }

      if (step.startsWith("rotate right")) {
        this.rotateRight(x);
      }

      if (step.startsWith("rotate based")) {
        this.rotateByLetter(a);
      }

      if (step.startsWith("reverse")) {
        this.reverse(x, y);
      }

      if (step.startsWith("move")) {
        this.move(x, y);
      }
    }
  }

  public unscramble(steps: string[]) {
    for (const step of steps.toReversed()) {
      const [x, y] = this.getNumbersFromStep(step);
      const [a, b] = this.getLettersFromStep(step);

      if (step.startsWith("swap position")) {
        this.swapPositions(x, y);
      }

      if (step.startsWith("swap letter")) {
        this.swapLetters(a, b);
      }

      if (step.startsWith("rotate left")) {
        this.rotateRight(x);
      }

      if (step.startsWith("rotate right")) {
        this.rotateLeft(x);
      }

      if (step.startsWith("rotate based")) {
        const index = this.chars.indexOf(a);
        this.rotateLeft(
          !index || index % 2 ? Math.floor(index / 2) + 1 : 5 + index / 2,
        );
      }

      if (step.startsWith("reverse")) {
        this.reverse(x, y);
      }

      if (step.startsWith("move")) {
        this.move(y, x);
      }
    }
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const scrambler = new PasswordScrambler([..."abcdefgh"]);
    scrambler.scramble(input.split("\n"));
    return scrambler.chars.join("");
  }

  protected part2(input: string): SolverOutput {
    const scrambler = new PasswordScrambler([..."fbgdceah"]);
    scrambler.unscramble(input.split("\n"));
    return scrambler.chars.join("");
  }
}
