import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [
    `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`,
  ];
  ingredients: number[][] = [];

  parseIngredients(input: string) {
    for (const line of input.split("\n")) {
      const props = line.match(/-?[\d]+/g) ?? [];
      this.ingredients.push(props.map((d) => parseInt(d)));
    }
  }

  getMaxScore(): number {
    return 0;
  }

  protected part1(input: string): SolverOutput {
    this.parseIngredients(input);
    let maxScore = 0;
    const qtyGenerator =
      this.ingredients.length === 2
        ? iterateTwoIntegersBelowN(100)
        : iterateFourIntegersBelowN(100);
    for (const qtys of qtyGenerator) {
      let score = 1;
      for (let propIndex = 0; propIndex < 4; propIndex++) {
        const propScore = Math.max(
          this.ingredients
            .map((props, i) => props[propIndex] * qtys[i])
            .reduce((a, b) => a + b),
          0,
        );
        score *= propScore;
      }

      if (score === 0) {
        continue;
      }

      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  }

  protected part2(input: string): SolverOutput {
    this.parseIngredients(input);
    let maxScore = 0;
    const qtyGenerator =
      this.ingredients.length === 2
        ? iterateTwoIntegersBelowN(100)
        : iterateFourIntegersBelowN(100);
    for (const qtys of qtyGenerator) {
      let score = 1;
      for (let propIndex = 0; propIndex < 4; propIndex++) {
        const propScore = Math.max(
          this.ingredients
            .map((props, i) => props[propIndex] * qtys[i])
            .reduce((a, b) => a + b),
          0,
        );
        score *= propScore;
      }

      if (score === 0) {
        continue;
      }

      const calories = this.ingredients
        .map((props, i) => props[4] * qtys[i], 0)
        .reduce((a, b) => a + b);

      if (calories !== 500) {
        continue;
      }

      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  }
}

function* iterateTwoIntegersBelowN(n: number) {
  for (let i = 0; i < n; i++) {
    const j = n - i;
    if (i == j) continue;
    yield [i, j];
  }
}

function* iterateFourIntegersBelowN(n: number) {
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n - i; j++) {
      for (let k = 0; k <= n - i - j; k++) {
        const l = n - i - j - k;
        if (
          i === j ||
          i === k ||
          i === l ||
          j === k ||
          j === l ||
          k === l ||
          i + j + k + l !== n
        ) {
          continue;
        }
        yield [i, j, k, l];
      }
    }
  }
}
