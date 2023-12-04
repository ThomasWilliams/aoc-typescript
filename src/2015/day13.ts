import { AbstractSolver, SolverOutput } from "../solver";
import { generatePermutations } from "~util/permutations";

export default class Solver extends AbstractSolver {
  graph: Record<string, Record<string, number>> = {};

  buildGraph(lines: string[]) {
    for (const line of lines) {
      const [, key, gainOrLose, amt, adj] =
        line.match(
          /([A-Za-z]+) would (lose|gain) ([\d]+) happiness units by sitting next to ([A-Za-z]+)/,
        ) ?? [];
      if (!this.graph[key]) {
        this.graph[key] = {};
      }
      this.graph[key][adj] = parseInt(amt) * (gainOrLose === "lose" ? -1 : 1);
    }
  }

  getNetHappiness(seat1: string, seat2: string): number {
    return this.graph[seat1][seat2] + this.graph[seat2][seat1];
  }

  protected part1(input: string): SolverOutput {
    this.buildGraph(input.split("\n"));
    const seatings = generatePermutations(Object.keys(this.graph));

    return seatings.reduce((maxHappiness, seating) => {
      const happiness = seating
        .map((seat, i) =>
          this.getNetHappiness(seat, seating[(i + 1) % seating.length]),
        )
        .reduce((a, b) => a + b);
      return Math.max(happiness, maxHappiness);
    }, Number.NEGATIVE_INFINITY);
  }

  protected part2(input: string): SolverOutput {
    this.buildGraph(input.split("\n"));
    const seatings = generatePermutations(Object.keys(this.graph));

    let optimalSeating: { happiness: number; seating: string[] } = {
      happiness: Number.NEGATIVE_INFINITY,
      seating: [],
    };

    seatings.forEach((seating) => {
      const happiness = seating
        .map((seat, i) =>
          this.getNetHappiness(seat, seating[(i + 1) % seating.length]),
        )
        .reduce((a, b) => a + b);
      if (happiness > optimalSeating.happiness) {
        optimalSeating = { happiness, seating };
      }
    });

    const worstPairing = optimalSeating.seating.reduce(
      (worst, seat, i, arr) => {
        const happiness = this.getNetHappiness(seat, arr[(i + 1) % arr.length]);
        return Math.min(happiness, worst);
      },
      Number.POSITIVE_INFINITY,
    );

    return optimalSeating.happiness - worstPairing;
  }
}
