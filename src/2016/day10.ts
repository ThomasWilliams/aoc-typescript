import { AbstractSolver, SolverOutput } from "~solver";
import { product } from "~util/product";

export default class Solver extends AbstractSolver {
  samples = [];
  outputs: number[] = [];
  bots: number[][] = [];
  botInstructions: Array<[string, string]> = [];
  specialIndex = -1;

  init(input: string) {
    for (const line of input.split("\n")) {
      if (line.startsWith("value")) {
        const [value, botIndex] = (line.match(/[\d]+/g) ?? []).map((n) =>
          parseInt(n),
        );
        if (!this.bots[botIndex]) {
          this.bots[botIndex] = [];
        }
        this.bots[botIndex].push(value);
      } else {
        const botIndex = parseInt(line.split(" ")[1]);
        const [inst1, inst2] = line
          .slice(10)
          .match(/(?:bot|output) [\d]+/g) ?? [""];
        this.botInstructions[botIndex] = [inst1, inst2];
      }
    }
  }

  run() {
    const botQueue: number[] = [];
    this.bots.forEach((vals, i) => {
      if (vals.length > 1) botQueue.push(i);
    });

    while (botQueue.length) {
      const botIndex = botQueue.shift() ?? 0;
      const [lowValue, highValue] = this.bots[botIndex].sort((a, b) => a - b);

      if (lowValue === 17 && highValue === 61 && this.specialIndex < 0) {
        this.specialIndex = botIndex;
      }

      const [lowInstruction, highInstruction] = this.botInstructions[botIndex];

      const lowTarget = lowInstruction.split(" ")[0];
      const lowIndex = parseInt(lowInstruction.split(" ")[1]);
      const highTarget = highInstruction.split(" ")[0];
      const highIndex = parseInt(highInstruction.split(" ")[1]);

      if (lowTarget === "bot") {
        if (!this.bots[lowIndex]) {
          this.bots[lowIndex] = [];
        }
        this.bots[lowIndex].push(lowValue);

        if (this.bots[lowIndex].length > 1) {
          botQueue.push(lowIndex);
        }
      } else {
        this.outputs[lowIndex] = lowValue;
      }

      if (highTarget === "bot") {
        if (!this.bots[highIndex]) {
          this.bots[highIndex] = [];
        }
        this.bots[highIndex].push(highValue);

        if (this.bots[highIndex].length > 1) {
          botQueue.push(highIndex);
        }
      } else {
        this.outputs[highIndex] = highValue;
      }

      this.bots[botIndex] = [];
    }
  }

  protected part1(input: string): SolverOutput {
    this.init(input);
    this.run();
    return this.specialIndex;
  }

  protected part2(input: string): SolverOutput {
    this.init(input);
    this.run();
    return product(...this.outputs.slice(0, 3));
  }
}
