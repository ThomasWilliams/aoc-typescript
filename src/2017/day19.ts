import { AbstractSolver, DebugFn, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const router = new Router(input, this.debug);
    router.walk();
    return router.chars.join("");
  }

  protected part2(input: string): SolverOutput {
    const router = new Router(input, this.debug);
    router.walk();
    return router.steps;
  }
}

enum Dir {
  North,
  South,
  East,
  West,
}

class Router {
  routing: string[][];
  dir: Dir;
  vectors = {
    [Dir.South]: [1, 0],
    [Dir.North]: [-1, 0],
    [Dir.East]: [0, 1],
    [Dir.West]: [0, -1],
  };
  chars: string[] = [];
  steps = 1;

  constructor(
    input: string,
    private debug: DebugFn = () => {},
  ) {
    this.routing = input
      .split("\n")
      .slice(1)
      .map((line) => [...line]);
    this.dir = Dir.South;
  }

  private findStartingCoord(): [number, number] {
    let [row, col] = [0, 0];
    while (this.routing[row][col] !== "|") {
      col++;
    }
    return [row, col];
  }

  walk() {
    this.debug(JSON.stringify(this.routing[1]));
    let [row, col] = this.findStartingCoord();

    while (true) {
      this.debug(row, col);
      if (
        row < 0 ||
        row >= this.routing.length ||
        col < 0 ||
        col >= this.routing[0].length
      ) {
        break;
      }

      const ch = this.routing[row][col];
      this.debug(ch);
      if (ch === " ") {
        break;
      }

      if (/[A-Z]/.test(ch)) {
        this.chars.push(ch);
      }

      if (ch === "+") {
        if (this.dir === Dir.South || this.dir === Dir.North) {
          this.dir =
            col > 0 && this.routing[row][col - 1] !== " " ? Dir.West : Dir.East;
        } else {
          this.dir =
            row > 0 && this.routing[row - 1][col] !== " "
              ? Dir.North
              : Dir.South;
        }
      }

      const [dRow, dCol] = this.vectors[this.dir];
      [row, col] = [row + dRow, col + dCol];
      this.steps++;
    }
  }
}
