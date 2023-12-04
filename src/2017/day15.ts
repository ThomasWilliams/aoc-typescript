import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const genA = new Gen(516, 16807).generate();
    const genB = new Gen(190, 48271).generate();

    let count = 0;
    for (let i = 0; i < 40000000; i++) {
      const a = genA.next();
      const b = genB.next();
      if (a.value % 65536 === b.value % 65536) {
        count++;
      }
    }

    return count;
  }

  protected part2(input: string): SolverOutput {
    const genA = new Gen(516, 16807, 4).generate();
    const genB = new Gen(190, 48271, 8).generate();

    let count = 0;
    for (let i = 0; i < 5000000; i++) {
      const a = genA.next();
      const b = genB.next();
      if (a.value % 65536 === b.value % 65536) {
        count++;
      }
    }

    return count;
  }
}

class Gen {
  private readonly divisor = 2147483647;

  constructor(
    private value: number,
    private factor: number,
    private multiple: number = 1,
  ) {}

  *generate(): Generator<number> {
    while (true) {
      this.value = (this.value * this.factor) % this.divisor;
      if (this.value % this.multiple === 0) {
        yield this.value;
      }
    }
  }
}
