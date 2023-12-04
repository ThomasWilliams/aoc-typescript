import { AbstractSolver, SolverOutput } from "~solver";
import { createHash } from "crypto";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const passwordChars: string[] = [];
    let i = 1;

    while (passwordChars.length < 8) {
      const hash = createHash("md5").update(`${input}${i++}`).digest("hex");
      if (hash.startsWith("00000")) {
        passwordChars.push(hash[5]);
      }
    }

    return passwordChars.join("");
  }

  protected part2(input: string): SolverOutput {
    const passwordChars: string[] = new Array(8).fill("");
    let i = 1;
    let count = 0;
    while (count < 8) {
      const hash = createHash("md5").update(`${input}${i++}`).digest("hex");
      if (hash.startsWith("00000")) {
        const pos = parseInt(hash[5]);
        if (pos >= 0 && pos < 8 && passwordChars[pos] === "") {
          passwordChars[pos] = hash[6];
          count++;
        }
      }
    }

    return passwordChars.join("");
  }
}
