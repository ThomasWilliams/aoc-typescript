import { AbstractSolver, SolverOutput } from "~solver";

type Round = {
  redCount: number;
  greenCount: number;
  blueCount: number;
};

type Game = {
  id: number;
  rounds: Round[];
};

export default class Solver extends AbstractSolver {
  samples = [
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
  ];

  parseRound(segment: string): Round {
    const round = { redCount: 0, greenCount: 0, blueCount: 0 };
    for (const section of segment.split(", ")) {
      const [count, color] = section.split(" ");
      if (color === "red") {
        round.redCount = parseInt(count);
      } else if (color === "green") {
        round.greenCount = parseInt(count);
      } else if (color === "blue") {
        round.blueCount = parseInt(count);
      }
    }
    return round;
  }

  parseLine(line: string): Game {
    const [idSection, roundSection] = line.split(": ");
    const id = parseInt(idSection.split(" ")[1]);
    const rounds = roundSection
      .split("; ")
      .map((segment) => this.parseRound(segment));
    return { id, rounds };
  }

  parseInput(input: string): Game[] {
    return input.split("\n").map((line) => this.parseLine(line));
  }

  protected part1(input: string): SolverOutput {
    const redCap = 12;
    const greenCap = 13;
    const blueCap = 14;

    const games = this.parseInput(input);

    this.debug(JSON.stringify(games, null, 2));
    return games
      .filter((game) => {
        for (const { redCount, greenCount, blueCount } of game.rounds) {
          if (redCount > redCap) {
            this.debug(`found ${redCount} red in game ${game.id}`);
            return false;
          }
          if (greenCount > greenCap) {
            this.debug(`found ${greenCount} green in game ${game.id}`);
            return false;
          }
          if (blueCount > blueCap) {
            this.debug(`found ${blueCount} blue in game ${game.id}`);
            return false;
          }
        }
        return true;
      })
      .reduce((sum, { id }) => sum + id, 0);
  }

  protected part2(input: string): SolverOutput {
    return this.parseInput(input)
      .map((game) =>
        game.rounds
          .reduce(
            (maxs, { redCount, greenCount, blueCount }) => [
              Math.max(maxs[0], redCount),
              Math.max(maxs[1], greenCount),
              Math.max(maxs[2], blueCount),
            ],
            [0, 0, 0],
          )
          .reduce((a, b) => a * b),
      )
      .reduce((a, b) => a + b);
  }
}
