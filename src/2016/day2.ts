import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const lines = input.split("\n");
    const keypad: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const pos = [1, 1];
    const combo = [];

    for (const line of lines) {
      for (const ch of line.split("")) {
        switch (ch) {
          case "U":
            pos[0] = Math.max(0, pos[0] - 1);
            break;
          case "L":
            pos[1] = Math.max(0, pos[1] - 1);
            break;
          case "D":
            pos[0] = Math.min(keypad.length - 1, pos[0] + 1);
            break;
          case "R":
            pos[1] = Math.min(keypad[0].length - 1, pos[1] + 1);
            break;
        }
      }
      combo.push(keypad[pos[0]][pos[1]]);
    }

    return combo.join("");
  }

  protected part2(input: string): SolverOutput {
    const lines = input.split("\n");
    const keypad = [
      [null, null, 1, null, null],
      [null, 2, 3, 4, null],
      [5, 6, 7, 8, 9],
      [null, "A", "B", "C", null],
      [null, null, "D", null, null],
    ];
    const pos = [2, 0];

    const validPositions = new Set<string>();
    for (let row = 0; row < keypad.length; row++) {
      for (let col = 0; col < keypad[row].length; col++) {
        if (keypad[row][col]) {
          validPositions.add(JSON.stringify([row, col]));
        }
      }
    }

    const combo = [];

    for (const line of lines) {
      for (const ch of line.split("")) {
        if (
          ch === "U" &&
          validPositions.has(JSON.stringify([pos[0] - 1, pos[1]]))
        ) {
          pos[0] -= 1;
        }
        if (
          ch === "L" &&
          validPositions.has(JSON.stringify([pos[0], pos[1] - 1]))
        ) {
          pos[1] -= 1;
        }
        if (
          ch === "D" &&
          validPositions.has(JSON.stringify([pos[0] + 1, pos[1]]))
        ) {
          pos[0] += 1;
        }
        if (
          ch === "R" &&
          validPositions.has(JSON.stringify([pos[0], pos[1] + 1]))
        ) {
          pos[1] += 1;
        }
      }
      combo.push(keypad[pos[0]][pos[1]]);
    }

    return combo.join("");
  }
}
