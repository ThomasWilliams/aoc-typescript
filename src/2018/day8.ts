import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];
  nums: number[] = [];

  parseInput(input: string) {
    this.nums = input.split(/[\s]+/).map((n) => parseInt(n));
  }

  getMetadataSum(): number {
    let index = 0;
    const sumFn = (): number => {
      const childCount = this.nums[index++];
      const metaCount = this.nums[index++];

      let metadataSum = 0;
      for (let i = 0; i < childCount; i++) {
        metadataSum += sumFn();
      }

      for (let i = 0; i < metaCount; i++) {
        metadataSum += this.nums[index++];
      }

      return metadataSum;
    };

    return sumFn();
  }

  protected part1(input: string): SolverOutput {
    this.parseInput(input);
    return this.getMetadataSum();
  }

  protected part2(input: string): SolverOutput {
    const nums = input.split(/[\s]+/).map((n) => parseInt(n));

    let index = 0;
    const getMetadataSum = (): number => {
      const childCount = nums[index++];
      const metaCount = nums[index++];

      const childValues: number[] = [];
      const metaValues: number[] = [];

      for (let i = 0; i < childCount; i++) {
        childValues.push(getMetadataSum());
      }

      for (let i = 0; i < metaCount; i++) {
        metaValues.push(nums[index++]);
      }

      if (childCount === 0) {
        return metaValues.reduce((a, b) => a + b);
      } else {
        return metaValues
          .map((i) => childValues[i - 1] ?? 0)
          .reduce((a, b) => a + b);
      }
    };

    return getMetadataSum();
  }
}
