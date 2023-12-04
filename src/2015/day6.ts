import { AbstractSolver, SolverOutput } from "../solver";

enum InstructionType {
  TurnOn,
  TurnOff,
  Toggle,
}

type Instruction = {
  instructionType: InstructionType;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export default class Solver extends AbstractSolver {
  parseInstruction(line: string): Instruction {
    const re =
      /(turn off|turn on|toggle) ([\d]{1,3}),([\d]{1,3}) through ([\d]{1,3}),([\d]{1,3})/g;
    const [, type, x1, y1, x2, y2] = [...line.matchAll(re)][0];
    return {
      instructionType: this.parseInstructionType(type),
      xMin: Math.min(parseInt(x1), parseInt(x2)),
      xMax: Math.max(parseInt(x1), parseInt(x2)),
      yMin: Math.min(parseInt(y1), parseInt(y2)),
      yMax: Math.max(parseInt(y1), parseInt(y2)),
    };
  }

  parseInstructionType(type: string): InstructionType {
    switch (type) {
      case "turn on":
        return InstructionType.TurnOn;
      case "turn off":
        return InstructionType.TurnOff;
      case "toggle":
        return InstructionType.Toggle;
      default:
        throw new Error("boom");
    }
  }

  protected part1(input: string): SolverOutput {
    const grid = new Array(1000).fill(0).map(() => new Array(1000).fill(false));
    input.split("\n").forEach((line) => {
      const { xMin, xMax, yMin, yMax, instructionType } =
        this.parseInstruction(line);
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          if (instructionType === InstructionType.TurnOn) {
            grid[x][y] = true;
          } else if (instructionType === InstructionType.TurnOff) {
            grid[x][y] = false;
          } else {
            grid[x][y] = !grid[x][y];
          }
        }
      }
    });
    return grid
      .map((row) => row.filter(Boolean).length)
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    const grid = new Array(1000).fill(0).map(() => new Array(1000).fill(false));
    input.split("\n").forEach((line) => {
      const { xMin, xMax, yMin, yMax, instructionType } =
        this.parseInstruction(line);
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          if (instructionType === InstructionType.TurnOn) {
            grid[x][y] += 1;
          }

          if (instructionType === InstructionType.TurnOff && grid[x][y] > 0) {
            grid[x][y] -= 1;
          }

          if (instructionType === InstructionType.Toggle) {
            grid[x][y] += 2;
          }
        }
      }
    });
    return grid
      .map((row) => row.reduce((a, b) => a + b))
      .reduce((a, b) => a + b);
  }
}
