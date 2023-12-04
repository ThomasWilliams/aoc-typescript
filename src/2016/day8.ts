import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const grid = new Grid(50, 6);
    for (const instruction of input.split("\n")) {
      grid.parseInstruction(instruction);
    }
    return grid.getLitCount();
  }

  protected part2(input: string): SolverOutput {
    const grid = new Grid(50, 6);
    for (const instruction of input.split("\n")) {
      grid.parseInstruction(instruction);
    }
    return grid.toString();
  }
}

class Grid {
  private grid: string[][];

  constructor(width: number, height: number) {
    this.grid = [...new Array(height).keys()].map(() =>
      new Array(width).fill("."),
    );
  }

  parseInstruction(instruction: string) {
    const [a, b] = (instruction.match(/[\d]+/g) ?? []).map((d) => parseInt(d));
    if (instruction.includes("rect")) {
      this.rect(a, b);
    }
    if (instruction.includes("row")) {
      this.rotateRow(a, b);
    }
    if (instruction.includes("column")) {
      this.rotateCol(a, b);
    }
  }

  rect(width: number, height: number) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        this.grid[row][col] = "#";
      }
    }
  }

  rotateRow(y: number, by: number) {
    for (let i = 0; i < by; i++) {
      this.grid[y].unshift(this.grid[y].pop() ?? ".");
    }
  }

  rotateCol(x: number, by: number) {
    const col = this.grid.map((row) => row[x]);
    for (let i = 0; i < by; i++) {
      col.unshift(col.pop() ?? ".");
    }
    for (const [y, row] of this.grid.entries()) {
      row[x] = col[y];
    }
  }

  getLitCount(): number {
    return this.grid
      .map((row) => row.filter((cell) => cell === "#").length)
      .reduce((a, b) => a + b);
  }

  toString(): string {
    return "\n" + this.grid.map((row) => row.join("")).join("\n") + "\n";
  }
}
