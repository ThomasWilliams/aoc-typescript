import { AbstractSolver, SolverOutput } from "~solver";

class Computer {
  registers: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  index = 0;

  run(input: string) {
    const instructions = input.split("\n");
    while (this.index < instructions.length) {
      this.processInstruction(instructions[this.index]);
    }
  }

  processInstruction(instruction: string) {
    const [command, ...vars] = instruction.split(" ");
    switch (command) {
      case "cpy":
        this.copy(vars[0], vars[1]);
        break;
      case "inc":
        this.increase(vars[0]);
        break;
      case "dec":
        this.decrease(vars[0]);
        break;
      case "jnz":
        this.jump(vars[0], vars[1]);
        break;
    }
  }

  copy(val: string, reg: string) {
    const value = isNaN(parseInt(val)) ? this.registers[val] : parseInt(val);
    this.registers[reg] = value;
    this.index++;
  }

  increase(reg: string) {
    this.registers[reg]++;
    this.index++;
  }

  decrease(reg: string) {
    this.registers[reg]--;
    this.index++;
  }

  jump(tst: string, val: string) {
    const value = isNaN(parseInt(val)) ? this.registers[val] : parseInt(val);
    const test = isNaN(parseInt(tst)) ? this.registers[tst] : parseInt(tst);
    this.index += test !== 0 ? value : 1;
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const computer = new Computer();
    computer.run(input);
    return computer.registers["a"];
  }

  protected part2(input: string): SolverOutput {
    const computer = new Computer();
    computer.registers["c"] = 1;
    computer.run(input);
    return computer.registers["a"];
  }
}
