import { AbstractSolver, SolverOutput } from "~solver";

export class KnotHash {
  list: number[];
  pos: number;
  skip: number;

  constructor(size = 256) {
    this.list = [...Array(size).keys()];
    this.pos = 0;
    this.skip = 0;
  }

  generate(lengths: number[], cycles = 1) {
    for (let i = 0; i < cycles; i++) {
      for (const length of lengths) {
        for (
          let start = this.pos, end = this.pos + length - 1;
          start < end;
          start++, end--
        ) {
          const front = this.list[start % this.list.length];
          const back = this.list[end % this.list.length];

          this.list[start % this.list.length] = back;
          this.list[end % this.list.length] = front;
        }
        this.pos += length + this.skip;
        this.pos %= this.list.length;
        this.skip++;
      }
    }
  }

  getDenseHash() {
    return [...Array(16).keys()].map((i) =>
      this.list.slice(i * 16, (i + 1) * 16).reduce((a, b) => a ^ b),
    );
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const lengths = input.split(",").map((n) => parseInt(n));
    const knot = new KnotHash();
    knot.generate(lengths);

    return knot.list[0] * knot.list[1];
  }

  protected part2(input: string): SolverOutput {
    const lengths = input
      .split("")
      .map((s) => s.charCodeAt(0))
      .concat([17, 31, 73, 47, 23]);
    const knot = new KnotHash();
    knot.generate(lengths, 64);

    return knot
      .getDenseHash()
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("");
  }
}
