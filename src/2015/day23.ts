import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  runProgram(lines: string[], a: number, b: number): number {
    const proc: Record<string, number> = { a, b };
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const instruction = line.substring(0, 3);

      if (instruction === "hlf") {
        proc[line.charAt(4)] /= 2;
        i++;
      } else if (instruction === "tpl") {
        proc[line.charAt(4)] *= 3;
        i++;
      } else if (instruction === "inc") {
        proc[line.charAt(4)] += 1;
        i++;
      } else if (instruction === "jmp") {
        i += parseInt(line.split(" ")[1]);
      } else if (instruction === "jie") {
        const register = line.charAt(4);
        if (proc[register] % 2 === 0) {
          i += parseInt(line.split(", ")[1]);
        } else {
          i++;
        }
      } else if (instruction === "jio") {
        const register = line.charAt(4);
        if (proc[register] === 1) {
          i += parseInt(line.split(", ")[1]);
        } else {
          i++;
        }
      }
    }

    return proc.b;
  }

  protected part1(input: string): SolverOutput {
    const lines = input.split("\n");
    return this.runProgram(lines, 0, 0);
  }

  protected part2(input: string): SolverOutput {
    const lines = input.split("\n");
    return this.runProgram(lines, 1, 0);
  }
}
