import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const lines = input.split("\n");
    const molecule = lines.pop() ?? "";
    const nextGenMolecules = new Set<string>();

    for (const line of lines) {
      if (!line || !line.includes("=>")) continue;

      const [from, to] = line.split(" => ");
      if (!from || !to) continue;

      for (const { index } of molecule.matchAll(new RegExp(from, "g"))) {
        nextGenMolecules.add(
          molecule.slice(0, index) + molecule.slice(index).replace(from, to),
        );
      }
    }

    return nextGenMolecules.size;
  }

  protected part2(input: string): SolverOutput {
    const [chunks, originalMolecule] = input.split("\n\n");
    const conversions: string[][] = chunks
      .split("\n")
      .map((s) => s.split(" => "))
      .sort(([, toA], [, toB]) => toB.length - toA.length);
    let molecule = originalMolecule.slice();
    let changes = 0;
    while (molecule !== "e") {
      const [to, from] =
        conversions.find(([to, from]) => molecule.includes(from)) ?? [];
      molecule = molecule.replace(from, to);
      changes++;
    }
    return changes;
  }
}
