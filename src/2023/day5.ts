import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = [
    `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
  ];

  parseMaps(input: string): number[][][] {
    return input
      .split("\n\n")
      .slice(1)
      .map((chunk) =>
        chunk
          .split("\n")
          .slice(1)
          .map((line) => line.split(" ").map((n) => parseInt(n))),
      );
  }

  parseSeeds(input: string): number[] {
    return input
      .split("\n\n")[0]
      .split(": ")[1]
      .split(" ")
      .map((n) => parseInt(n));
  }

  getDestination(source: number, maps: number[][]): number {
    for (const [destinationStart, sourceStart, rangeLength] of maps) {
      if (source >= sourceStart && source < sourceStart + rangeLength) {
        return destinationStart + (source - sourceStart);
      }
    }
    return source;
  }

  getSource(destination: number, maps: number[][]): number {
    for (const [destinationStart, sourceStart, rangeLength] of maps) {
      if (
        destination >= destinationStart &&
        destination < destinationStart + rangeLength
      ) {
        return sourceStart + (destination - destinationStart);
      }
    }
    return destination;
  }

  trackSeedToLocation(seed: number, maps: number[][][]): number {
    let source = seed;
    for (const section of maps) {
      source = this.getDestination(source, section);
    }
    return source;
  }

  trackLocationToSeed(location: number, maps: number[][][]): number {
    let destination = location;
    for (const section of maps.toReversed()) {
      destination = this.getSource(destination, section);
      this.debug(destination);
    }
    return destination;
  }

  seedIsInRanges(seed: number, ranges: number[]): boolean {
    for (let i = 0; i < ranges.length; i += 2) {
      const rangeStart = ranges[i];
      const rangeLength = ranges[i + 1];
      if (seed >= rangeStart && seed < rangeStart + rangeLength) {
        return true;
      }
    }
    return false;
  }

  protected part1(input: string): SolverOutput {
    const maps = this.parseMaps(input);
    const seeds = this.parseSeeds(input);
    return seeds
      .map((seed) => this.trackSeedToLocation(seed, maps))
      .reduce((a, b) => Math.min(a, b));
  }

  protected part2(input: string): SolverOutput {
    const maps = this.parseMaps(input);
    const seedRanges = this.parseSeeds(input);
    let location = 1;
    while (location < 1000000000) {
      const seed = this.trackLocationToSeed(location, maps);
      if (this.seedIsInRanges(seed, seedRanges)) {
        return seed;
      }
      location++;
    }
    return "not found";
  }
}
