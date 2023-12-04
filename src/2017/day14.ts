import { AbstractSolver, DebugFn, SolverOutput } from "~solver";
import { KnotHash } from "./day10";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const disk = new Disk(input);
    return disk.getUsed();
  }

  protected part2(input: string): SolverOutput {
    const disk = new Disk(input, this.debug);
    return disk.countRegions();
  }
}

const generateKnotHash = (input: string): string => {
  const lengths = input
    .split("")
    .map((s) => s.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
  const knot = new KnotHash();
  knot.generate(lengths, 64);

  return knot
    .getDenseHash()
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
};

class Disk {
  bits: boolean[][];

  constructor(
    input: string,
    private debug: DebugFn = () => {},
  ) {
    this.bits = [...Array(128).keys()].map((i) =>
      generateKnotHash(`${input}-${i}`)
        .split("")
        .map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
        .join("")
        .split("")
        .map((b) => b === "1"),
    );
  }

  getUsed(): number {
    return sum(...this.bits.map((row) => row.filter((b) => b).length));
  }

  // isRawNumberUsed(n: number): boolean {
  //   return this.isCoordUsed(...this.numToCoord(n));
  // }

  isCoordUsed(row: number, col: number): boolean {
    return (
      row >= 0 && row < 128 && col >= 0 && col < 128 && this.bits[row][col]
    );
  }

  // numToCoord = (n: number): [number, number] => [Math.floor(n / 128), n % 128];
  // coordToNum = (row: number, col: number): number => row * 128 + col;

  // getRegionWithNum(n: number): number[] {
  //   const region = new Set<number>();

  //   const walk = (node: number, visited: number[] = []) => {
  //     // this.debug(node);
  //     if (!this.isRawNumberUsed(node) || visited.includes(node)) return;
  //     this.debug(String(visited));
  //     region.add(node);
  //     const [row, col] = this.numToCoord(node);
  //     for (const [dRow, dCol] of [
  //       [1, 0],
  //       [-1, 0],
  //       [0, 1],
  //       [0, -1],
  //     ]) {
  //       const [ri, ci] = [row + dRow, col + dCol];
  //       if (
  //         ri >= 0 &&
  //         ri < 128 &&
  //         ci >= 0 &&
  //         ci < 128 &&
  //         !visited.includes(this.coordToNum(ri, ci))
  //       ) {
  //         walk(this.coordToNum(ri, ci), [...visited, node]);
  //       }
  //     }
  //   };

  //   walk(n);

  //   return [...region];
  // }

  countRegions(): number {
    const visited: string[] = [];
    let count = 0;

    const walk = (row: number, col: number) => {
      if (visited.includes(String([row, col])) || !this.bits[row][col]) return;
      visited.push(String([row, col]));
      if (row > 0) walk(row - 1, 0);
      if (row < 127) walk(row + 1, 0);
      if (col > 0) walk(0, col - 1);
      if (col < 127) walk(0, col + 1);
    };

    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 128; j++) {
        if (visited.includes(String([i, j])) || !this.bits[i][j]) continue;
        count++;
        walk(i, j);
      }
    }

    return count;
  }
}
