import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = [];

  calcFuelForNumber = (n: number): number => Math.floor(n / 3) - 2;

  calcFuelForLine = (line: string): number => {
    let input = parseInt(line);
    let fuel = 0;
    while (input) {
      fuel += input;
      input = this.calcFuelForNumber(input);
    }
    return fuel;
  };

  protected part1(input: string): SolverOutput {
    return sum(input.split("\n").map((n) => Math.floor(parseInt(n) / 3) - 2));
  }

  protected part2(input: string): SolverOutput {
    return sum(input.split("\n").map((line) => this.calcFuelForLine(line)));
  }
}
