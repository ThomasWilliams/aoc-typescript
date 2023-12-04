import { AbstractSolver, SolverOutput } from "~solver";

type Disc = {
  size: number;
  p0: number;
};

export default class Solver extends AbstractSolver {
  samples = [];
  discs: Disc[] = [];

  getPositionOfDisc = ({ size, p0 }: Disc, t: number): number =>
    (t + p0) % size;

  initDiscs(input: string) {
    for (const line of input.split("\n")) {
      const [size, p0] = (line.match(/ [\d]+/g) ?? []).map((n) =>
        parseInt(n.trim()),
      );
      this.discs.push({ size, p0 });
    }
  }

  findAlignmentTime(): number {
    let t = -1;
    let found = false;
    while (!found) {
      t++;
      found = this.discs.every(
        (disc, i) => this.getPositionOfDisc(disc, t + i + 1) === 0,
      );
    }
    return t;
  }

  protected part1(input: string): SolverOutput {
    this.initDiscs(input);
    return this.findAlignmentTime();
  }

  protected part2(input: string): SolverOutput {
    this.initDiscs(input);
    this.discs.push({ size: 11, p0: 0 });
    return this.findAlignmentTime();
  }
}
