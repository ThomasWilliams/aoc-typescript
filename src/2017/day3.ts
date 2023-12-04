import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";
import { cartesianProduct } from "~util/cartesian-product";

export default class Solver extends AbstractSolver {
  samples = [];
  dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  protected part1(input: string): SolverOutput {
    const target = parseInt(input);
    let x = 1;
    let coord = [0, 0];
    let step = 1.0;
    let i = 0;

    while (x < target) {
      const inc = Math.min(Math.floor(step), target - x);
      const dir = this.dirs[i];
      coord[0] += dir[0] * inc;
      coord[1] += dir[1] * inc;

      x += inc;
      step += 0.5;
      i = (i + 1) % 4;
    }

    return Math.abs(coord[0]) + Math.abs(coord[1]);
  }

  protected part2(input: string): SolverOutput {
    const target = parseInt(input);
    const vals: Map<string, number> = new Map<string, number>();
    vals.set(String([0, 0]), 1);
    let coord = [0, 0];
    let step = 1.0;
    let i = 0;

    while (true) {
      const inc = Math.floor(step);
      const dir = this.dirs[i];

      for (let j = 0; j < inc; j++) {
        const [x, y] = [coord[0] + dir[0], coord[1] + dir[1]];
        const amt = sum(
          ...cartesianProduct([x - 1, x, x + 1], [y - 1, y, y + 1]).map(
            (c) => vals.get(String(c)) ?? 0,
          ),
        );
        this.debug(amt);
        if (amt > target) {
          return amt;
        }

        coord = [x, y];
        vals.set(String(coord), amt);
      }

      step += 0.5;
      i = (i + 1) % 4;
    }
  }
}
