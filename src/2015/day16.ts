import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [];

  sues = new Map<number, Record<string, number>>();

  match: Record<string, number> = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  buildSuesFromInput(input: string) {
    const lines = input.split("\n");
    for (const [i, line] of lines.entries()) {
      const sue = line
        .replace(/^Sue [\d]+: /, "")
        .split(", ")
        .reduce(
          (sue, rawProp): Record<string, number> => {
            const [key, value] = rawProp.split(": ");
            return { ...sue, [key]: parseInt(value) };
          },
          {} as Record<string, number>,
        );
      this.sues.set(i + 1, sue);
    }
  }

  protected part1(input: string): SolverOutput {
    this.buildSuesFromInput(input);

    for (const [key, value] of Object.entries(this.match)) {
      for (const [i, sue] of this.sues) {
        if (sue[key] !== undefined && sue[key] !== value) {
          this.sues.delete(i);
        }
      }
    }
    return [...this.sues][0][0];
  }

  protected part2(input: string): SolverOutput {
    this.buildSuesFromInput(input);

    sueLoop: for (const [i, sue] of this.sues) {
      for (const [key, value] of Object.entries(sue)) {
        if (["cats", "trees"].includes(key)) {
          if (value <= this.match[key]) {
            continue sueLoop;
          }
        } else if (["pomeranians", "goldfish"].includes(key)) {
          if (value >= this.match[key]) {
            continue sueLoop;
          }
        } else if (value !== this.match[key]) {
          continue sueLoop;
        }
      }
      return i;
    }
    throw new Error();
  }
}
