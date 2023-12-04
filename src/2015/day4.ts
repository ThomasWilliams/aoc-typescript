import md5 from "md5";
import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  protected part1(input: string): SolverOutput {
    let num = 0;

    while (num < 100000000) {
      num++;
      const hash = md5(`${input}${num}`);
      if (/^00000/.test(hash)) {
        return num;
      }
    }
    throw new Error("didn't work");
  }

  protected part2(input: string): SolverOutput {
    let num = 0;

    while (num < 100000000) {
      num++;
      const hash = md5(`${input}${num}`);
      if (/^000000/.test(hash)) {
        return num;
      }
    }
    throw new Error("didn't work");
  }
}
