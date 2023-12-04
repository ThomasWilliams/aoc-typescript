import { AbstractSolver, DebugFn, SolverOutput } from "~solver";

enum Op {
  Copy,
  Increase,
  Decrease,
  Jump,
  Toggle,
}

type Instruction = {
  op: Op;
  args: string[];
};

class Computer {
  registers: Record<string, number>;
  instructions: Instruction[];
  index = 0;

  constructor(
    input: string,
    a = 0,
    private debug: DebugFn = () => {},
  ) {
    this.instructions = input.split("\n").map((line) => {
      const [command, ...args] = line.split(" ");
      const op: Op =
        command === "cpy"
          ? Op.Copy
          : command === "inc"
          ? Op.Increase
          : command === "dec"
          ? Op.Decrease
          : command === "jnz"
          ? Op.Jump
          : Op.Toggle;
      return { op, args };
    });
    this.registers = { a, b: 0, c: 0, d: 0 };
    this.debug(JSON.stringify(this.instructions, null, 2));
  }

  run() {
    while (this.index < this.instructions.length) {
      const { op, args } = this.instructions[this.index];
      switch (op) {
        case Op.Copy:
          this.copy(args[0], args[1]);
          break;
        case Op.Increase:
          this.increase(args[0]);
          break;
        case Op.Decrease:
          this.decrease(args[0]);
          break;
        case Op.Jump:
          this.jump(args[0], args[1]);
          break;
        case Op.Toggle:
          this.toggle(args[0]);
          break;
      }
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

  toggle(val: string) {
    const value = isNaN(parseInt(val)) ? this.registers[val] : parseInt(val);
    const target = this.instructions[this.index + value];
    if (target) {
      if (target.args.length === 1) {
        if (target.op === Op.Increase) {
          target.op = Op.Decrease;
        } else {
          target.op = Op.Increase;
        }
      } else {
        if (target.op === Op.Jump) {
          target.op = Op.Copy;
        } else {
          target.op = Op.Jump;
        }
      }
    }
    this.index++;
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const computer = new Computer(input, 7, this.debug);
    computer.run();
    return computer.registers["a"];
  }

  protected part2(input: string): SolverOutput {
    const computer = new Computer(input, 12, this.debug);
    computer.run();
    return computer.registers["a"];
  }
}
