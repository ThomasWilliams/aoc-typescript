import { AbstractSolver, SolverOutput } from "~solver";
import { sum } from "~util/sum";
import { product } from "~util/product";

export default class Solver extends AbstractSolver {
  samples = [];

  parseInput(input: string): number[] {
    return input.split("\n").map((n) => parseInt(n));
  }

  protected part1(input: string): SolverOutput {
    const weights = this.parseInput(input).toReversed();
    const targetWeight = sum(...weights) / 3;
    return findPackageQE(weights, targetWeight);
  }

  protected part2(input: string): SolverOutput {
    const weights = this.parseInput(input).toReversed();
    const targetWeight = sum(...weights) / 4;
    return findPackageQE(weights, targetWeight);
  }
}

const findPackageQE = (weights: number[], targetWeight: number): number => {
  let pkg = new Array<number>(targetWeight).fill(1);

  const walk = (current: number[], sum: number, index: number) => {
    if (sum > targetWeight) {
      return;
    }
    if (sum === targetWeight) {
      if (
        current.length < pkg.length ||
        (current.length === pkg.length && product(...current) < product(...pkg))
      ) {
        pkg = current;
      }
      return;
    }

    for (let i = index; i < weights.length; i++) {
      if (weights[i] <= targetWeight - sum) {
        walk([...current, weights[i]], sum + weights[i], i + 1);
      }
    }
  };

  walk([], 0, 0);

  return product(...pkg);
};
