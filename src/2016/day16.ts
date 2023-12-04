import { AbstractSolver, DebugFn, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const disk = new Disk(input, 272);
    disk.expand();
    return disk.getCheckSum();
  }

  protected part2(input: string): SolverOutput {
    const disk = new Disk(input, 35651584);
    disk.expand();
    return disk.getCheckSum();
  }
}

class Disk {
  data: string[];
  constructor(
    input: string,
    private diskSize: number,
  ) {
    this.data = [...input];
  }

  expand() {
    while (this.data.length < this.diskSize) {
      const b = this.data.toReversed().map((ch) => (ch === "1" ? "0" : "1"));
      this.data.push("0");
      this.data = this.data.concat(
        b.slice(0, this.diskSize - this.data.length),
      );
    }
  }

  getCheckSum(): string {
    let checkSum = this.data.slice();
    while (checkSum.length % 2 === 0) {
      const next = [];
      for (let i = 0; i < checkSum.length - 1; i += 2) {
        next.push(checkSum[i] === checkSum[i + 1] ? "1" : "0");
      }
      checkSum = next;
    }
    return checkSum.join("");
  }
}
