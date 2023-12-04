import { DebugFn, AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  parseInput(input: string): Record<string, string | number> {
    const lines = input.split("\n");
    const wires: Record<string, string | number> = {};
    for (const line of lines) {
      const [input, target] = line.split(" -> ");
      wires[target] = input;
    }
    return wires;
  }

  protected part1(input: string): SolverOutput {
    const circuit = new Circuit(this.parseInput(input), this.debug);
    return circuit.findSignal("a");
  }

  protected part2(input: string): SolverOutput {
    const wires = this.parseInput(input);
    const circuit = new Circuit({ ...wires }, this.debug);
    const val = circuit.findSignal("a");

    const circuit2 = new Circuit({ ...wires, b: val });
    return circuit2.findSignal("a");
  }
}

class Circuit {
  constructor(
    private wires: Record<string, string | number>,
    private debug: DebugFn = () => {},
  ) {}

  setWire(key: string, value: number) {
    this.wires[key] = value;
  }

  getWires(): Record<string, string | number> {
    return this.wires;
  }

  findSignal(key: string): number {
    if (key === "b") this.debug(`finding signal for ${key}`);
    const value = this.wires[key];
    let signal = 0;
    if (value === undefined) {
      throw new Error(`wire not found for key ${key}`);
    } else if (typeof value === "number") {
      return value;
    } else if (/^[\d]+$/.test(value)) {
      signal = +value;
    } else if (/LSHIFT/.test(value)) {
      const [, wire, shift] = value.match(/([a-z]+) LSHIFT ([\d]+)/) ?? [];
      signal = this.findSignal(wire) << +shift;
    } else if (/RSHIFT/.test(value)) {
      const [, wire, shift] = value.match(/([a-z]+) RSHIFT ([\d]+)/) ?? [];
      signal = this.findSignal(wire) >> +shift;
    } else if (/AND/.test(value)) {
      const [, leftWire, rightWire] =
        value.match(/([a-z0-9]+) AND ([a-z0-9]+)/) ?? [];
      const left = isNaN(+leftWire) ? this.findSignal(leftWire) : +leftWire;
      const right = isNaN(+rightWire) ? this.findSignal(rightWire) : +rightWire;
      signal = left & right;
    } else if (/OR/.test(value)) {
      const [, leftWire, rightWire] =
        value.match(/([a-z0-9]+) OR ([a-z0-9]+)/) ?? [];
      const left = isNaN(+leftWire) ? this.findSignal(leftWire) : +leftWire;
      const right = isNaN(+rightWire) ? this.findSignal(rightWire) : +rightWire;
      signal = left | right;
    } else if (/NOT/.test(value)) {
      const [, wire] = value.match(/NOT ([a-z]+)/) ?? [];
      signal = ~this.findSignal(wire);
    } else {
      signal = this.findSignal(value);
    }
    this.wires[key] = signal;
    return signal;
  }
}
