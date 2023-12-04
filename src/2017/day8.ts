import { AbstractSolver, SolverOutput } from "~solver";

class Computer {
  registers: Record<string, number>;
  maxAchieved = -Infinity;

  constructor() {
    this.registers = {};
  }

  getRegisterValue(regKey: string) {
    if (!this.registers[regKey]) this.registers[regKey] = 0;
    return this.registers[regKey];
  }

  compare(value: number, amt: number, op: string): boolean {
    switch (op) {
      case "<":
        return value < amt;
      case "<=":
        return value <= amt;
      case ">":
        return value > amt;
      case ">=":
        return value >= amt;
      case "==":
        return value == amt;
      case "!=":
        return value != amt;
      default:
        return false;
    }
  }

  update(regKey: string, amt: number, op: string) {
    if (!this.registers[regKey]) this.registers[regKey] = 0;
    switch (op) {
      case "inc":
        this.registers[regKey] += amt;
        break;
      case "dec":
        this.registers[regKey] -= amt;
        break;
    }
    this.maxAchieved = Math.max(this.maxAchieved, this.registers[regKey]);
  }

  run(input: string) {
    for (const line of input.split("\n")) {
      const [
        ,
        toUpdate,
        updateOp,
        updateAmt,
        toCompare,
        compareOp,
        compareAmt,
      ] =
        line.match(
          /([a-z]+) (inc|dec) (-?[\d]+) if ([a-z]+) ([^\s]+) (-?[\d]+)/,
        ) ?? [];

      const compareValue = this.getRegisterValue(toCompare);
      const conditionMet = this.compare(
        compareValue,
        parseInt(compareAmt),
        compareOp,
      );

      if (conditionMet) {
        this.update(toUpdate, parseInt(updateAmt), updateOp);
      }
    }
  }

  getCurrentMaxValue(): number {
    return Object.values(this.registers).reduce((a, b) => Math.max(a, b));
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const computer = new Computer();
    computer.run(input);
    return computer.getCurrentMaxValue();
  }

  protected part2(input: string): SolverOutput {
    const computer = new Computer();
    computer.run(input);
    return computer.maxAchieved;
  }
}
