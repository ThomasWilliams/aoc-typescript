/* eslint-disable indent */
export type SolverOutput = string | number;
export type DebugFn = (...msg: Array<string | number>) => void;

export abstract class AbstractSolver {
  protected samples: string[] = [];

  constructor(
    // protected year: string,
    // protected day: string,
    protected input: string,
    protected sampleMode: boolean,
    protected debugMode: boolean,
  ) {}

  debug: DebugFn = (...msg: Array<string | number>) =>
    this.debugMode && console.log(...msg);

  protected abstract part1(input: string): SolverOutput;

  protected abstract part2(input: string): SolverOutput;

  solvePart1(): string {
    this.debug("------------ Part 1 DEBUG OUTPUT START ------------");
    const p1Solution = this.sampleMode
      ? `\n${this.samples
          .map((sample, i) => `    S${i + 1}: ${this.part1(sample)}`)
          .join("\n")}`
      : `${this.part1(this.input)}`;
    this.debug("------------ Part 1 DEBUG OUTPUT END --------------");
    return p1Solution;
  }

  solvePart2() {
    this.debug("------------ Part 2 DEBUG OUTPUT START ------------");
    const p2Solution = this.sampleMode
      ? `\n${this.samples
          .map((sample, i) => `    S${i + 1}: ${this.part2(sample)}`)
          .join("\n")}`
      : `${this.part2(this.input)}`;
    this.debug("------------ Part 2 DEBUG OUTPUT END --------------");
    return p2Solution;
  }
}
