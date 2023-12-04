import { Command } from "commander";
import { AbstractSolver } from "./src/solver";

const program = new Command();
program
  .argument("<year>", "Year of the aoc event")
  .argument("<day>", "Day of the aoc event")
  .option("-s, --sample", "Run solver in sample mode", false)
  .option("-d, --debug", "Output debug statements", false);

program.parse();

const [year, day] = program.args;
const { sample, debug } = program.opts<{ sample: boolean; debug: boolean }>();

const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
const response = await fetch(inputUrl, {
  headers: { Cookie: `session=${process.env.TOKEN}` },
});
const input = (await response.text()).trim();

const solverModule: {
  default: {
    new (
      input: string,
      sampleMode: boolean,
      debugMode: boolean,
    ): AbstractSolver;
  };
} = await import(`./src/${year}/day${day}`);
const solverClass = solverModule.default;

const p1Solution = new solverClass(input, sample, debug).solvePart1();
const p2Solution = new solverClass(input, sample, debug).solvePart2();

console.log(`
============ ${year} - Day ${day} ============
Part 1: ${p1Solution}
Part 2: ${p2Solution}
=====================================${day.length >= 2 ? "=" : ""}
`);
