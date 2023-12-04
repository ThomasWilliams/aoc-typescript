import { AbstractSolver, DebugFn, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const codeGen = new CodeGenerator(1, 1, 20151125, this.debug);
    // this.debug(codeGen.generate(6, 6));
    return codeGen.generate(2978, 3083);
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}

class CodeGenerator {
  constructor(
    private row: number,
    private column: number,
    private value: number,
    private debug: DebugFn = () => {},
  ) {}

  generate(row: number, column: number): number {
    while (!(row === this.row && column === this.column)) {
      this.debug(this.row, this.column);
      this.value = (this.value * 252533) % 33554393;
      this.row--;
      this.column++;
      if (this.row === 0) {
        this.row = this.column;
        this.column = 1;
      }
    }

    return this.value;
  }
}
