import { AbstractSolver, SolverOutput } from "../solver";

type Reindeer = {
  speed: number;
  flyInterval: number;
  restInterval: number;
  position: number;
  score: number;
};

export default class Solver extends AbstractSolver {
  samples = [];
  reindeers: Reindeer[] = [];
  readonly DURATION = 2503;

  generateReindeers(lines: string[]) {
    for (const line of lines) {
      const [speed, flyInterval, restInterval] = (
        line.match(/[\d]+/g) ?? []
      ).map((d) => parseInt(d));
      this.reindeers.push({
        speed,
        flyInterval,
        restInterval,
        position: 0,
        score: 0,
      });
    }
  }

  protected part1(input: string): SolverOutput {
    this.generateReindeers(input.split("\n"));

    return this.reindeers
      .map(
        ({ speed, flyInterval, restInterval }): number =>
          Math.floor(this.DURATION / (flyInterval + restInterval)) *
            flyInterval *
            speed +
          Math.min(flyInterval, this.DURATION % (flyInterval + restInterval)) *
            speed,
      )
      .reduce((a, b) => Math.max(a, b));
  }

  protected part2(input: string): SolverOutput {
    this.generateReindeers(input.split("\n"));

    for (let t = 1; t <= this.DURATION; t++) {
      let max = 0;
      for (const reindeer of this.reindeers) {
        const { speed, flyInterval, restInterval } = reindeer;
        const cycleInterval = flyInterval + restInterval;
        const timeInCycle = t % cycleInterval;
        if (timeInCycle > 0 && timeInCycle <= flyInterval) {
          reindeer.position += speed;
        }

        if (reindeer.position > max) {
          max = reindeer.position;
        }
      }

      for (const reindeer of this.reindeers) {
        if (reindeer.position === max) {
          reindeer.score++;
        }
      }
    }

    return this.reindeers
      .map(({ score }) => score)
      .reduce((a, b) => Math.max(a, b));
  }
}
