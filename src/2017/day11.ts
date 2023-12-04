import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = ["ne,ne,ne", "ne,ne,sw,sw", "ne,ne,s,s"];

  protected part1(input: string): SolverOutput {
    const hexGrid = new HexGrid();
    hexGrid.walk(input.split(","));
    return hexGrid.getDistance();
  }

  protected part2(input: string): SolverOutput {
    let maxDistance = 0;
    const hexGrid = new HexGrid();
    for (const step of input.split(",")) {
      hexGrid.move(step);
      maxDistance = Math.max(maxDistance, hexGrid.getDistance());
    }
    return maxDistance;
  }
}

class HexGrid {
  coord = [0, 0, 0];

  walk(steps: string[]) {
    steps.forEach((s) => this.move(s));
  }

  move(step: string) {
    switch (step) {
      case "n":
        this.coord[1]--;
        this.coord[2]++;
        break;
      case "ne":
        this.coord[0]++;
        this.coord[1]--;
        break;
      case "se":
        this.coord[0]++;
        this.coord[2]--;
        break;
      case "s":
        this.coord[1]++;
        this.coord[2]--;
        break;
      case "sw":
        this.coord[0]--;
        this.coord[1]++;
        break;
      case "nw":
        this.coord[0]--;
        this.coord[2]++;
        break;
    }
  }

  getDistance(): number {
    return sum(...this.coord.map((n) => Math.abs(n))) / 2;
  }
}
