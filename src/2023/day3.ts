import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

type NumberRange = {
  row: number;
  colRange: [number, number];
  value: number;
};

export default class Solver extends AbstractSolver {
  samples = [
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
  ];

  findAllNumberRanges(chars: string[][]): NumberRange[] {
    const ranges: NumberRange[] = [];
    for (const row of range(chars.length)) {
      let col = 0;
      while (col < chars[row].length) {
        if (/[\d]/.test(chars[row][col])) {
          const start = col;
          while (/[\d]/.test(chars[row][col])) {
            col++;
          }
          ranges.push({
            row,
            colRange: [start, col],
            value: parseInt(chars[row].slice(start, col).join("")),
          });
        } else {
          col++;
        }
      }
    }
    return ranges;
  }

  numberRangeHasSpecialChar(
    chars: string[][],
    { row, colRange: [col1, col2], value }: NumberRange,
  ): boolean {
    const foundLeft = col1 > 0 && chars[row][col1 - 1] !== ".";
    const foundRight = col2 < chars[row].length && chars[row][col2] !== ".";
    const foundTop =
      row > 0 &&
      chars[row - 1]
        .slice(Math.max(0, col1 - 1), col2 + 1)
        .some((ch) => ch !== ".");
    const foundBottom =
      row < chars.length - 1 &&
      chars[row + 1]
        .slice(Math.max(0, col1 - 1), col2 + 1)
        .some((ch) => ch !== ".");
    this.debug(
      `${value} -- L: ${foundLeft}; R: ${foundRight}; T: ${foundTop}; B: ${foundBottom}`,
    );
    return foundLeft || foundRight || foundTop || foundBottom;
  }

  protected part1(input: string): SolverOutput {
    const chars: string[][] = input.split("\n").map((line) => line.split(""));
    const numberRanges = this.findAllNumberRanges(chars);
    this.debug(JSON.stringify(numberRanges, null, 2));
    return numberRanges
      .filter((range) => this.numberRangeHasSpecialChar(chars, range))
      .map((range) => range.value)
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    const chars: string[][] = input.split("\n").map((line) => line.split(""));
    const numberRanges = this.findAllNumberRanges(chars);

    let sum = 0;
    for (const i of range(chars.length)) {
      for (const j of range(chars[i].length)) {
        if (chars[i][j] === "*") {
          this.debug(`gear found at ${i},${j}`);
          const adjacentRanges = numberRanges.filter(
            ({ row, colRange: [col1, col2] }) =>
              row >= i - 1 && row <= i + 1 && j >= col1 - 1 && j <= col2,
          );
          this.debug(
            "adjacent ranges",
            adjacentRanges.map((r) => "" + r.value).join(","),
          );
          if (adjacentRanges.length === 2) {
            sum += adjacentRanges[0].value * adjacentRanges[1].value;
          }
        }
      }
    }

    return sum;
  }
}
