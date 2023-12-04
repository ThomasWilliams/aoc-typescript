import { AbstractSolver, SolverOutput } from "~solver";
import { createHash } from "crypto";

export default class Solver extends AbstractSolver {
  samples = [];
  passcode = "qzthpkfp";
  vaultPaths: string[] = [];

  getLocks(path: string[]): boolean[] {
    const hash = createHash("md5")
      .update([this.passcode, ...path].join(""))
      .digest("hex");
    return [...hash.slice(0, 4)].map((d) => parseInt(d, 16) > 10);
  }

  findVaultPaths(path: string[], [row, col]: [number, number]) {
    this.debug(`walking | path: ${path}; coord: ${[row, col]}`);
    if (row === 3 && col === 3) {
      this.vaultPaths.push(path.join(""));
      return;
    }

    const locks = this.getLocks(path);
    if (locks[0] && row > 0) {
      this.findVaultPaths([...path, "U"], [row - 1, col]);
    }
    if (locks[1] && row < 3) {
      this.findVaultPaths([...path, "D"], [row + 1, col]);
    }
    if (locks[2] && col > 0) {
      this.findVaultPaths([...path, "L"], [row, col - 1]);
    }
    if (locks[3] && col < 3) {
      this.findVaultPaths([...path, "R"], [row, col + 1]);
    }
  }

  findShortestPath(): string {
    return this.vaultPaths.sort((a, b) => a.length - b.length)[0];
  }

  findLongestPath(): string {
    return this.vaultPaths.sort((a, b) => b.length - a.length)[0];
  }

  protected part1(input: string): SolverOutput {
    this.findVaultPaths([], [0, 0]);
    return this.findShortestPath();
  }

  protected part2(input: string): SolverOutput {
    this.findVaultPaths([], [0, 0]);
    this.debug(JSON.stringify(this.vaultPaths));
    return this.findLongestPath().length;
  }
}
