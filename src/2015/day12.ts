import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  getValue = (input: Array<unknown> | Record<string, unknown>): number => {
    let vals: unknown[] = [];

    if (Array.isArray(input)) {
      vals = input;
    } else {
      vals = Object.values(input);
      if (vals.includes("red")) return 0;
    }

    return vals
      .map((val: unknown): number => {
        if (typeof val === "object") {
          return this.getValue(val as Record<string, unknown>);
        } else if (typeof val === "number") {
          return val;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b);
  };

  protected part1(input: string): SolverOutput {
    let sum = 0;
    while (/[\d]/.test(input)) {
      const m = input.match(/-?[\d]+/);
      if (!m) continue;
      sum += +m[0];
      input = input.slice((m.index ?? 0) + m[0].length);
    }
    return sum;
  }

  protected part2(input: string): SolverOutput {
    const doc: Record<string, unknown> = JSON.parse(input);
    return this.getValue(doc);
  }
}
