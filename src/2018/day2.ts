import { AbstractSolver, SolverOutput } from "~solver";
import { getLetterCounts } from "~util/letter-counts";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const letterCounts = input.split("\n").map((line) => getLetterCounts(line));
    return (
      letterCounts.filter((dict) => Object.values(dict).includes(2)).length *
      letterCounts.filter((dict) => Object.values(dict).includes(3)).length
    );
  }

  protected part2(input: string): SolverOutput {
    const lines = input.split("\n");
    for (const [i, line1] of lines.entries()) {
      for (const line2 of lines.slice(i + 1)) {
        const diff = compare(line1, line2);
        if (diff >= 0) {
          return line1
            .split("")
            .filter((_, i) => i !== diff)
            .join("");
        }
      }
    }
    throw new Error();
  }
}

const compare = (line1: string, line2: string): number => {
  if (line1.length !== line2.length) {
    return -1;
  }

  const different: number[] = [];
  for (let i = 0; i < line1.length; i++) {
    if (line1.charAt(i) !== line2.charAt(i)) {
      different.push(i);
    }
  }
  return different.length === 1 ? different[0] : -1;
};
