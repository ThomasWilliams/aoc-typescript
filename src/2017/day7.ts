import { AbstractSolver, SolverOutput } from "~solver";

type Program = {
  weight: number;
  children: string[];
  totalWeight?: number;
};

export default class Solver extends AbstractSolver {
  samples = [];
  programs: Record<string, Program> = {};

  initPrograms(input: string) {
    const lines = input.split("\n");
    for (const line of lines) {
      const [, name, weight] = line.match(/^([a-z]+) \(([\d]+)\)/) ?? [];
      const children = /->/.test(line) ? line.split(" -> ")[1].split(", ") : [];
      this.programs[name] = { weight: parseInt(weight), children };
    }
  }

  protected part1(input: string): SolverOutput {
    this.initPrograms(input);
    const allChildren = new Set<string>();
    for (const { children } of Object.values(this.programs)) {
      for (const child of children) {
        allChildren.add(child);
      }
    }

    for (const name of Object.keys(this.programs)) {
      if (!allChildren.has(name)) {
        return name;
      }
    }

    throw new Error();
  }

  protected part2(input: string): SolverOutput {
    this.initPrograms(input);
    const findRoot = (): string => {
      const allChildren = new Set<string>();
      for (const { children } of Object.values(this.programs)) {
        for (const child of children) {
          allChildren.add(child);
        }
      }

      for (const name of Object.keys(this.programs)) {
        if (!allChildren.has(name)) {
          return name;
        }
      }

      throw new Error("didn't find it");
    };

    const getAndPopulateTotalWeight = (programName: string): number => {
      const program = this.programs[programName];
      const childWeight = program.children.length
        ? program.children
            .map((name) => getAndPopulateTotalWeight(name))
            .reduce((a, b) => a + b)
        : 0;
      program.totalWeight = program.weight + childWeight;
      return program.totalWeight;
    };

    const findBadDisc = (name: string, target: number): number => {
      const sortedChildren = this.programs[name].children
        .map((name) => ({ name, ...this.programs[name] }))
        .sort(
          (a, b) => (a.totalWeight ?? a.weight) - (b.totalWeight ?? b.weight),
        );

      if (sortedChildren[0].totalWeight !== sortedChildren[1].totalWeight) {
        return findBadDisc(
          sortedChildren[0].name,
          sortedChildren[1].totalWeight ?? 0,
        );
      }

      if (
        sortedChildren.at(-1)?.totalWeight !==
        sortedChildren.at(-2)?.totalWeight
      ) {
        return findBadDisc(
          sortedChildren.at(-1)?.name ?? "",
          sortedChildren.at(-2)?.totalWeight ?? 0,
        );
      }

      const { weight, totalWeight } = this.programs[name];
      return weight + (target - (totalWeight ?? 0));
    };

    const root = findRoot();
    getAndPopulateTotalWeight(root);
    return findBadDisc(root, 0);
  }
}
