import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

type Vector = [number, number];

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const cluster = Cluster.fromInput(input);
    let minMoment = -1;
    let minSize = Infinity;
    for (const i of range(1000000)) {
      cluster.tick();
      const [width, height] = cluster.getDiffs();
      const size = width + height;
      this.debug(size);
      if (size < minSize) {
        minSize = size;
        minMoment = i;
      }
    }
    console.log(`smallest size of ${minSize} at moment ${minMoment}`);

    return "exit";
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}

class Particle {
  constructor(
    public position: Vector,
    public velocity: Vector,
  ) {}

  tick() {
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
  }

  backTick() {
    this.position[0] -= this.velocity[0];
    this.position[1] -= this.velocity[1];
  }
}

class Cluster {
  constructor(public particles: Particle[]) {}

  static fromInput(input: string): Cluster {
    const particles: Particle[] = input.split("\n").map((line) => {
      const [p1, p2, v1, v2] = (line.match(/[\d]+/g) ?? []).map((n) =>
        parseInt(n),
      );
      return new Particle([p1, p2], [v1, v2]);
    });
    return new Cluster(particles);
  }

  tick() {
    this.particles.forEach((p) => p.tick());
  }

  backTick() {
    this.particles.forEach((p) => p.backTick());
  }

  getDiffs(): [number, number] {
    const [xMin, yMin] = this.getMins();
    const [xMax, yMax] = this.getMaxs();
    return [xMax - xMin, yMax - yMin];
  }

  private getMins(): [number, number] {
    let xMin = Infinity;
    let yMin = Infinity;
    for (const p of this.particles) {
      const [x, y] = p.position;
      if (x < xMin) xMin = x;
      if (y < yMin) yMin = y;
    }
    return [xMin, yMin];
  }

  private getMaxs(): [number, number] {
    let xMax = -Infinity;
    let yMax = -Infinity;
    for (const p of this.particles) {
      const [x, y] = p.position;
      if (x > xMax) xMax = x;
      if (y > yMax) yMax = y;
    }
    return [xMax, yMax];
  }

  print(): string {
    const [rowMin, colMin] = this.getMins();
    const [rowMax, colMax] = this.getMaxs();
    const grid = Array.from(new Array(rowMax + 1 - rowMin), () =>
      new Array(colMax - colMin).fill("."),
    );
    for (const p of this.particles) {
      grid[p.position[0] - rowMin][p.position[1] - colMin] = "#";
    }
    return grid.map((row) => row.join("")).join("\n");
  }
}
