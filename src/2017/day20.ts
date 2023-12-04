import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = [];
  particles: Particle[] = [];

  parseInput(input: string) {
    return input.split("\n").map((line) => {
      const [p1, p2, p3, v1, v2, v3, a1, a2, a3] = (
        line.match(/-?[\d]+/g) ?? []
      ).map((n) => parseInt(n));
      return new Particle([p1, p2, p3], [v1, v2, v3], [a1, a2, a3]);
    });
  }

  protected part1(input: string): SolverOutput {
    const particles = this.parseInput(input);
    return particles
      .map((p, i) => {
        const [a1, a2, a3] = p.acceleration;
        const absAcc = Math.sqrt(sum(a1 * a1, a2 * a2, a3 * a3));
        return [i, absAcc];
      })
      .reduce((p1, p2) => (p1[1] < p2[1] ? p1 : p2))[0];
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}

type Vector = [number, number, number];

class Particle {
  constructor(
    public position: Vector,
    public veloctiy: Vector,
    public acceleration: Vector,
  ) {}
}
