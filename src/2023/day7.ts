import { AbstractSolver, SolverOutput } from "~solver";
import { getLetterCounts } from "~util/letter-counts";

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

type Hand = {
  cards: string;
  handType: HandType;
  bid: number;
};

export default class Solver extends AbstractSolver {
  samples = [];
  cardRank = "23456789TJQKA";

  getHandType(cards: string, withJokers = false): HandType {
    const letterCounts = getLetterCounts(cards);
    if (
      withJokers &&
      "J" in letterCounts &&
      Object.keys(letterCounts).length > 1
    ) {
      const jokerCount = letterCounts.J;
      delete letterCounts.J;

      const cardWithHighestCount = Object.entries(letterCounts).reduce(
        (a, b) => (a[1] >= b[1] ? a : b),
      )[0];
      letterCounts[cardWithHighestCount] += jokerCount;
    }
    const letterCountsValues = Object.values(letterCounts);
    if (letterCountsValues.includes(5)) {
      return HandType.FiveOfAKind;
    } else if (letterCountsValues.includes(4)) {
      return HandType.FourOfAKind;
    } else if (letterCountsValues.includes(3)) {
      if (letterCountsValues.includes(2)) {
        return HandType.FullHouse;
      } else {
        return HandType.ThreeOfAKind;
      }
    } else if (letterCountsValues.includes(2)) {
      if (letterCountsValues.length === 3) {
        return HandType.TwoPair;
      } else {
        return HandType.OnePair;
      }
    } else {
      return HandType.HighCard;
    }
  }

  // getHandTypeWithJokers(cards: string): HandType {
  //   const letterCounts = getLetterCounts(cards);
  //   const letterCountsValues = Object.values(letterCounts);
  //   return HandType.HighCard;
  // }

  parseInput(input: string, withJokers = false): Hand[] {
    return input.split("\n").map((line) => {
      const cards = line.split(" ")[0];
      const bid = parseInt(line.split(" ")[1]);
      const handType = this.getHandType(cards, withJokers);
      // const handType = withJokers
      //   ? this.getHandType(cards)
      //   : this.getHandTypeWithJokers(cards);
      return { cards, bid, handType };
    });
  }

  cardSort(a: string, b: string): number {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        const aIndex = this.cardRank.indexOf(a[i]);
        const bIndex = this.cardRank.indexOf(b[i]);
        if (aIndex >= 0 && bIndex >= 0) {
          return aIndex - bIndex;
        }
      }
    }
    return 0;
  }

  handSort(a: Hand, b: Hand): number {
    return a.handType !== b.handType
      ? a.handType - b.handType
      : this.cardSort(a.cards, b.cards);
  }

  protected part1(input: string): SolverOutput {
    return this.parseInput(input)
      .sort((a, b) => this.handSort(a, b))
      .map(({ bid }, i) => bid * (i + 1))
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    this.cardRank = "J23456789TQKA";
    return this.parseInput(input, true)
      .sort((a, b) => this.handSort(a, b))
      .map(({ bid }, i) => bid * (i + 1))
      .reduce((a, b) => a + b);
  }
}
