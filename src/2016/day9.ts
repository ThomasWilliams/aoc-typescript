import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [
    // "(3x3)XYZ",
    // "X(8x2)(3x3)ABCY",
    // "(27x12)(20x12)(13x14)(7x10)(1x12)A",
    "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN",
  ];
  compressedSeqRegex = /\(([\d]+)x([\d]+)\)/;

  getDecompressedLength(s: string, recursive = false): number {
    this.debug(`calculating length for ${s}`);
    const m = s.match(this.compressedSeqRegex);
    if (!m) return s.length;

    this.debug(`grabbed ${m[0]} out of ${s}`);

    const repLength = m[0].length;
    const span = parseInt(m[1]);
    const times = parseInt(m[2]);
    const index = m.index ?? 0;
    const chunkStart = index + repLength;
    const chunkEnd = chunkStart + span;

    const chunk = s.slice(chunkStart, chunkEnd);
    this.debug(`next chunk ${chunk}`);

    const chunkLength = recursive
      ? this.getDecompressedLength(chunk, true)
      : chunk.length;

    const decompressedLength =
      index +
      chunkLength * times +
      this.getDecompressedLength(s.slice(index + repLength + span));
    this.debug(`decompressed length of ${s} is ${decompressedLength}`);
    return decompressedLength;
  }

  protected part1(input: string): SolverOutput {
    return this.getDecompressedLength(input);
  }

  protected part2(input: string): SolverOutput {
    return this.getDecompressedLength(input, true);
  }
}
