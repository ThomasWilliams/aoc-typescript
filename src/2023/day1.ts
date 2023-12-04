import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = [
    `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
    `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
  ];

  numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  findDigit(s: string, reverse = false): number {
    const re = /(?:zero|one|two|three|four|five|six|seven|eight|nine|[0-9])/;
    for (const i of range(1, s.length + 1)) {
      const sub = reverse ? s.slice(-i) : s.slice(0, i);
      if (re.test(sub)) {
        this.debug(sub);
        const [token] = [...(re.exec(sub) ?? [])];
        return this.numbers.includes(token)
          ? this.numbers.indexOf(token)
          : parseInt(token);
      }
    }
    return 0;
  }

  protected part1(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const nums = line.match(/[\d]/g) ?? ["0"];
        return parseInt(nums[0] + nums[nums.length - 1]);
      })
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    return input
      .split("\n")
      .map((line) => {
        const firstDigit = this.findDigit(line);
        const lastDigit = this.findDigit(line, true);
        this.debug(JSON.stringify({ firstDigit, lastDigit }));
        return 10 * firstDigit + lastDigit;
      })
      .reduce((a, b) => a + b);
  }
}
