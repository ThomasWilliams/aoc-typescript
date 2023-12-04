import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [];
  grid: string[][] = [];

  buildGridFromInput(input: string) {
    for (const line of input.split("\n")) {
      this.grid.push([...line]);
    }
  }

  getLitNeighbors([x, y]: [number, number]): number {
    let lit = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (!(i === x && j === y) && this.grid[i]?.[j] === "#") {
          lit++;
        }
      }
    }
    return lit;
  }

  isCorner = ([x, y]: [number, number]): boolean =>
    [0, this.grid.length - 1].includes(x) &&
    [0, this.grid[x].length - 1].includes(y);

  evolve(checkCorner = false) {
    const nextGrid: string[][] = new Array(this.grid.length)
      .fill([])
      .map((_) => new Array(this.grid[0].length).fill(""));

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const litNeighbors = this.getLitNeighbors([i, j]);
        nextGrid[i][j] =
          (checkCorner && this.isCorner([i, j])) ||
          litNeighbors === 3 ||
          (this.grid[i][j] === "#" && litNeighbors === 2)
            ? "#"
            : ".";
      }
    }
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = nextGrid[i].slice();
    }
  }

  protected part1(input: string): SolverOutput {
    this.buildGridFromInput(input);

    const steps = 100;
    for (let step = 0; step < steps; step++) {
      this.evolve();
    }

    return this.grid
      .map((row) => row.filter((cell) => cell === "#").length)
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    this.buildGridFromInput(input);

    this.grid[0][0] = "#";
    this.grid[0][this.grid[0].length - 1] = "#";
    this.grid[this.grid.length - 1][0] = "#";
    this.grid[this.grid.length - 1][
      this.grid[this.grid.length - 1].length - 1
    ] = "#";

    const steps = 100;
    for (let step = 0; step < steps; step++) {
      this.evolve(true);
    }

    return this.grid
      .map((row) => row.filter((cell) => cell === "#").length)
      .reduce((a, b) => a + b);
  }
}
