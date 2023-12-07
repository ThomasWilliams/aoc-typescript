import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = [
    `Time:      7  15   30
Distance:  9  40  200`,
  ];

  parseInput(input: string): [number, number][] {
    const [timeLine, distanceLine] = input.split("\n");
    const times = timeLine
      .split(/[\s]+/)
      .slice(1)
      .map((n) => parseInt(n));
    const distances = distanceLine
      .split(/[\s]+/)
      .slice(1)
      .map((n) => parseInt(n));
    return times.map((time, i) => [time, distances[i]]);
  }

  isWinningTime(holdTime: number, raceTime: number, distance: number): boolean {
    return holdTime * (raceTime - holdTime) > distance;
  }

  countWinningWays([time, distance]: [number, number]): number {
    let holdTime = 0;
    while (
      holdTime < time &&
      !this.isWinningTime(++holdTime, time, distance)
    ) {}

    return time + 1 - 2 * holdTime;
  }

  protected part1(input: string): SolverOutput {
    return this.parseInput(input)
      .map((race) => this.countWinningWays(race))
      .map((ways) => {
        this.debug(ways);
        return ways;
      })
      .reduce((a, b) => a * b);
  }

  protected part2(input: string): SolverOutput {
    const lines = input.split("\n");
    const time = parseInt((lines[0].match(/[\d]/g) ?? []).join(""));
    const distance = parseInt((lines[1].match(/[\d]/g) ?? []).join(""));
    return this.countWinningWays([time, distance]);
  }
}
