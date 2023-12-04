import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";
import { sum } from "~util/sum";

type Card = {
  winningNumbers: number[];
  scratchNumbers: number[];
};

export default class Solver extends AbstractSolver {
  samples = [
    `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
  ];

  parseInput(input: string): Card[] {
    return input.split("\n").map((line) => {
      const [winningChunk, scratchChunk] = line.split(/:[\s]+/)[1].split(" | ");
      return {
        winningNumbers: winningChunk.split(/[\s]+/).map((n) => parseInt(n)),
        scratchNumbers: scratchChunk.split(/[\s]+/).map((n) => parseInt(n)),
      };
    });
  }

  getMatchingCount({ winningNumbers, scratchNumbers }: Card): number {
    return scratchNumbers.filter((n) => winningNumbers.includes(n)).length;
  }

  getCardScore(card: Card): number {
    const found = this.getMatchingCount(card);
    return found ? Math.pow(2, found - 1) : 0;
  }

  getTotalCardCount(cards: Card[]): number {
    const counts = new Array(cards.length).fill(1);
    for (const [i, card] of cards.entries()) {
      const matches = this.getMatchingCount(card);
      const count = counts[i];
      const start = i + 1;
      const end = Math.min(counts.length, start + matches);
      for (const j of range(start, end)) {
        counts[j] += count;
      }
    }
    return sum(counts);
  }

  protected part1(input: string): SolverOutput {
    return sum(this.parseInput(input).map((card) => this.getCardScore(card)));
  }

  protected part2(input: string): SolverOutput {
    return this.getTotalCardCount(this.parseInput(input));
  }
}
