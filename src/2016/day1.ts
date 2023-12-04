import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let dirIndex = 0;

    const pos = [0, 0];

    const turn = (dir: string) => {
      dirIndex += dir === "R" ? 5 : 3;
      dirIndex %= 4;
    };

    for (const step of input.split(", ")) {
      const [, dir, d] = step.match(/(L|R)([\d]+)/) ?? [];
      const distance = parseInt(d);
      turn(dir);

      pos[0] += dirs[dirIndex][0] * distance;
      pos[1] += dirs[dirIndex][1] * distance;
    }

    return Math.abs(pos[0]) + Math.abs(pos[1]);
  }

  protected part2(input: string): SolverOutput {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let dirIndex = 0;

    const pos = [0, 0];
    const pastPositions = new Set<string>([JSON.stringify(pos)]);

    const turn = (dir: string) => {
      dirIndex += dir === "R" ? 5 : 3;
      dirIndex %= 4;
    };

    for (const step of input.split(", ")) {
      const [, dir, d] = step.match(/(L|R)([\d]+)/) ?? [];
      const distance = parseInt(d);
      turn(dir);

      for (let i = 0; i < distance; i++) {
        pos[0] += dirs[dirIndex][0];
        pos[1] += dirs[dirIndex][1];

        if (pastPositions.has(JSON.stringify(pos))) {
          return Math.abs(pos[0]) + Math.abs(pos[1]);
        }
        pastPositions.add(JSON.stringify(pos));
      }
    }

    return Math.abs(pos[0]) + Math.abs(pos[1]);
  }
}
