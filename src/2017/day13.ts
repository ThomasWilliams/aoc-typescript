import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];
  layers: number[] = [];

  parseInput(input: string) {
    for (const line of input.split("\n")) {
      const [depth, range] = (line.match(/([\d]+)/g) ?? []).map((n) =>
        parseInt(n),
      );
      this.layers[depth] = range;
    }
  }

  getPenalty(delay: number) {
    return this.layers
      .map((range, index) => {
        if (!range) return 0;
        const depth = index + delay;
        if (depth === 0 || range === 1 || depth % ((range - 1) * 2) === 0)
          return depth * range;
        return 0;
      })
      .reduce((a, b) => a + b);
  }

  protected part1(input: string): SolverOutput {
    this.parseInput(input);
    return this.getPenalty(0);
  }

  protected part2(input: string): SolverOutput {
    this.parseInput(input);
    let delay = 0;
    let penalty = this.getPenalty(delay);
    while (penalty > 0) {
      penalty = this.getPenalty(++delay);
    }

    return delay;
  }
}
