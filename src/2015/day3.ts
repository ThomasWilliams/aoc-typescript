import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  protected part1(input: string): SolverOutput {
    const coord = [0, 0];
    const houses: Set<string> = new Set<string>([coord.toString()]);
    for (const d of input) {
      switch (d) {
        case "<":
          coord[0]--;
          break;
        case ">":
          coord[0]++;
          break;
        case "v":
          coord[1]--;
          break;
        case "^":
          coord[1]++;
          break;
      }
      houses.add(coord.toString());
    }
    return houses.size;
  }

  protected part2(input: string): SolverOutput {
    const coords = [
      [0, 0],
      [0, 0],
    ];
    const houses: Set<string> = new Set<string>([coords[0].toString()]);
    for (const [i, d] of [...input].entries()) {
      const s = i % 2;
      switch (d) {
        case "<":
          coords[s][0]--;
          break;
        case ">":
          coords[s][0]++;
          break;
        case "v":
          coords[s][1]--;
          break;
        case "^":
          coords[s][1]++;
          break;
      }
      houses.add(coords[s].toString());
    }
    return houses.size;
  }
}
