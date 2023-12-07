import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    return IntcodeMachine.fromInput(input).run(12, 2);
  }

  protected part2(input: string): SolverOutput {
    for (const noun of range(100)) {
      for (const verb of range(100)) {
        const output = IntcodeMachine.fromInput(input).run(noun, verb);
        if (output === 19690720) {
          return 100 * noun + verb;
        }
      }
    }
    throw new Error("answer not found");
  }
}

class IntcodeMachine {
  private pointer: number;
  private memory: number[];

  constructor(private initMemory: number[]) {
    this.memory = initMemory.slice();
    this.pointer = 0;
  }

  static fromInput(input: string): IntcodeMachine {
    return new IntcodeMachine(input.split(",").map((n) => parseInt(n)));
  }

  init() {
    this.memory = this.initMemory.slice();
    this.pointer = 0;
  }

  getNext(n: number): number[] {
    const values = this.memory.slice(this.pointer, this.pointer + n);
    this.pointer += n;
    return values;
  }

  add() {
    const [arg1, arg2, arg3] = this.getNext(3);
    this.memory[arg3] = this.memory[arg1] + this.memory[arg2];
  }

  multiply() {
    const [arg1, arg2, arg3] = this.getNext(3);
    this.memory[arg3] = this.memory[arg1] * this.memory[arg2];
  }

  run(noun: number, verb: number): number {
    this.memory[1] = noun;
    this.memory[2] = verb;
    while (this.pointer < this.memory.length) {
      const [opcode] = this.getNext(1);
      switch (opcode) {
        case 1:
          this.add();
          break;
        case 2:
          this.multiply();
          break;
        case 99:
          return this.memory[0];
      }
    }
    throw Error("end of memory reached");
  }
}
