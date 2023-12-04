/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [
    `""
"abc"
"aaa\"aaa"
"\x27"`,
  ];

  getLineScore(line: string): number {
    const rawLength = line.length;
    let compiledLength = 0;
    let p = 0;
    const chars = line.slice(1, line.length - 1).split("");
    while (p < chars.length) {
      if (chars[p] === "\\") {
        if (chars[p + 1] === "\\" || chars[p + 1] === '"') {
          p += 2;
        } else if (/x[0-9a-f]{2}/.test(chars.slice(p + 1, p + 4).join(""))) {
          p += 4;
        } else {
          p++;
        }
      } else {
        p++;
      }
      compiledLength++;
    }
    this.debug(rawLength, compiledLength);
    return rawLength - compiledLength;
  }

  protected part1(input: string): SolverOutput {
    // I'm pretty sure this one needs to be done with an actual file input
    // const file = Bun.file(`./day8-input`);
    return input
      .split("\n")
      .map((s) => {
        this.debug(s, s.length);
        return s;
      })
      .map((line) => this.getLineScore(line))
      .map((s) => {
        this.debug(s);
        return s;
      })
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    // this.debug(input);
    return input.slice(0, 1);
  }
}
