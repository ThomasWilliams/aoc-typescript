import { AbstractSolver, SolverOutput } from "~solver";
import { getLetterCounts } from "~util/letter-counts";

type Room = {
  name: string;
  sectorId: string;
  checksum: string;
};

export default class Solver extends AbstractSolver {
  samples = [];

  getValidRooms(input: string): Room[] {
    return input
      .split("\n")
      .map((line) => {
        const [, name, sectorId, checksum] =
          line.match(/([a-z-]+)-([\d]+)\[([a-z]+)\]/) ?? [];
        return { name, sectorId, checksum };
      })
      .filter(
        ({ name, checksum }) =>
          Object.entries(getLetterCounts(name))
            .sort(([ch1, count1], [ch2, count2]) => {
              if (count1 !== count2) return count2 - count1;
              return ch1.charCodeAt(0) - ch2.charCodeAt(0);
            })
            .map(([ch]) => ch)
            .slice(0, 5)
            .join("") === checksum,
      );
  }

  protected part1(input: string): SolverOutput {
    return this.getValidRooms(input)
      .map(({ sectorId }) => parseInt(sectorId))
      .reduce((a, b) => a + b);
  }

  protected part2(input: string): SolverOutput {
    return (
      this.getValidRooms(input)
        .map(({ name, sectorId }) => {
          const rotateBy = parseInt(sectorId) % 26;
          const newName = name
            .split("")
            .map((ch) => {
              if (ch === "-") return " ";
              const alphaIndex = ch.charCodeAt(0) - 97;
              const newIndex = (alphaIndex + rotateBy) % 26;
              return String.fromCharCode(newIndex + 97);
            })
            .join("");
          return `${newName} ${sectorId}`;
        })
        .find((s) => /northpole/i.test(s)) ?? ""
    );
  }
}
