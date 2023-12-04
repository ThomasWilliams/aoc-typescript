import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const moves = input.split(",");
    const start = "abcdefghijklmnop";
    const program = new Program(start);
    return program.dance(moves);
  }

  protected part2(input: string): SolverOutput {
    const moves = input.split(",");
    const start = "abcdefghijklmnop";
    const program = new Program(start);
    let steps = 0;
    while (true) {
      const output = program.dance(moves);
      steps++;
      if (output === start) {
        break;
      }
    }

    steps = 1000000000 % steps;
    const program2 = new Program(start);
    for (let j = 0; j < steps; j++) {
      program2.dance(moves);
    }
    return program2.output();
  }
}

class Program {
  private programs: string[];

  constructor(input: string) {
    this.programs = input.split("");
  }

  spin(n: number) {
    for (let i = 0; i < n; i++) {
      this.programs.unshift(this.programs.pop() ?? "");
    }
  }

  exchange(i: number, j: number) {
    [this.programs[i], this.programs[j]] = [this.programs[j], this.programs[i]];
  }

  partner(e1: string, e2: string) {
    const i = this.programs.findIndex((e) => e === e1);
    const j = this.programs.findIndex((e) => e === e2);
    this.exchange(i, j);
  }

  dance(moves: string[]) {
    for (const move of moves) {
      switch (move.charAt(0)) {
        case "s":
          const n = parseInt(move.slice(1));
          this.spin(n);
          break;
        case "x":
          const [i, j] = move
            .slice(1)
            .split("/")
            .map((n) => parseInt(n));
          this.exchange(i, j);
          break;
        case "p":
          this.partner(move.charAt(1), move.charAt(3));
          break;
      }
    }
    return this.output();
  }

  output(): string {
    return this.programs.join("");
  }
}

class Swapper<T> {
  constructor(
    public vals: T[],
    private swapKeys: number[],
  ) {}

  swap() {
    this.vals = this.swapKeys.map((k) => this.vals[k]);
  }
}
