import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = [];

  calcFuelForNumber = (n: number): number => Math.floor(n / 3) - 2;

  calcFuelForLine = (line: number): number => {
    const fuels: number[] = [];
    let fuel = this.calcFuelForNumber(line);
    while (fuel > 0) {
      fuels.push(fuel);
      fuel = this.calcFuelForNumber(fuel);
    }
    return sum(fuels);
  };

  protected part1(input: string): SolverOutput {
    return sum(
      input.split("\n").map((line) => this.calcFuelForNumber(parseInt(line))),
    );
  }

  protected part2(input: string): SolverOutput {
    return sum(
      input.split("\n").map((line) => this.calcFuelForLine(parseInt(line))),
    );
  }
}
