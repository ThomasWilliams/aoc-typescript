import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const memBanks = input.split(/[\s]+/).map((d) => parseInt(d));

    const arrangements = new Set<string>();
    let steps = 0;

    while (!arrangements.has(JSON.stringify(memBanks))) {
      arrangements.add(JSON.stringify(memBanks));

      const maxBank = memBanks.reduce((a, b) => Math.max(a, b));
      const maxIndex = memBanks.findIndex((bank) => bank === maxBank);

      let alloc = memBanks[maxIndex];
      let j = maxIndex;
      memBanks[maxIndex] = 0;

      while (alloc) {
        j = (j + 1) % memBanks.length;
        memBanks[j]++;
        alloc--;
      }
      steps++;
    }

    return steps;
  }

  protected part2(input: string): SolverOutput {
    const memBanks = input.split(/[\s]+/).map((d) => parseInt(d));

    const arrangements = new Map<string, number>();
    let steps = 0;

    while (!arrangements.has(JSON.stringify(memBanks))) {
      arrangements.set(JSON.stringify(memBanks), steps);

      const maxBank = memBanks.reduce((a, b) => Math.max(a, b));
      const maxIndex = memBanks.findIndex((bank) => bank === maxBank);

      let alloc = memBanks[maxIndex];
      let j = maxIndex;
      memBanks[maxIndex] = 0;

      while (alloc) {
        j = (j + 1) % memBanks.length;
        memBanks[j]++;
        alloc--;
      }
      steps++;
    }

    return steps - (arrangements.get(JSON.stringify(memBanks)) ?? 0);
  }
}
