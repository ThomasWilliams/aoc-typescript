import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";
import { intersection } from "~util/intersection";

export default class Solver extends AbstractSolver {
  samples = [];
  dirs: Record<string, [number, number]> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  getPoints(input: string): number[][] {
    const instructions = input.split(",");
    const cursor = [0, 0];
    const points: number[][] = [[0, 0]];
    let dist = 0;
    for (const instruction of instructions) {
      const dir = instruction[0];
      const len = parseInt(instruction.slice(1));
      const [dx, dy] = this.dirs[dir];
      for (const _ of range(len)) {
        cursor[0] += dx;
        cursor[1] += dy;
        points[++dist] = cursor.slice();
      }
    }
    return points;
  }

  protected part1(input: string): SolverOutput {
    const [line1, line2] = input
      .split("\n")
      .map((line) => this.getPoints(line));
    this.debug(input);
    return 0;
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}
