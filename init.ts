import { Command } from "commander";

const program = new Command();
program
  .argument("<year>", "Year of the aoc event")
  .argument("<day>", "Day of the aoc event");

program.parse();

const [year, day] = program.args;

const file = Bun.file(`src/${year}/day${day}.ts`);
const fileExists = await file.exists();

if (!fileExists) {
  const fileContents = `import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}
`;
  await Bun.write(file, fileContents);
}
