import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const elves = new Set(
      [...new Array(parseInt(input)).keys()].map((n) => n + 1),
    );

    let take = false;
    while (elves.size > 1) {
      for (const elf of elves) {
        if (take) {
          this.debug(`deleting ${elf}`);
          elves.delete(elf);
        }
        take = !take;
      }
    }

    return [...elves.values()][0];
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}
