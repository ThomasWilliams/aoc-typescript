import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const instructions = input.split("\n").map((d) => parseInt(d));

    let i = 0;
    let steps = 0;
    while (i < instructions.length) {
      const instruction = instructions[i];
      instructions[i] += 1;
      i += instruction;
      steps++;
    }

    return steps;
  }

  protected part2(input: string): SolverOutput {
    const instructions = input.split("\n").map((d) => parseInt(d));

    let i = 0;
    let steps = 0;
    while (i < instructions.length) {
      const instruction = instructions[i];
      instructions[i] += instruction >= 3 ? -1 : 1;
      i += instruction;
      steps++;
    }

    return steps;
  }
}
