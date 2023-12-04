import { AbstractSolver, SolverOutput } from "../solver";
import { sum } from "~util/sum";

export default class Solver extends AbstractSolver {
  samples = [];
  multiples: number[][] = [[], [1], [1, 2], [1, 3]];

  getMultiples(n: number): number[] {
    if (this.multiples[n]) return this.multiples[n];

    for (let i = 2; i <= Math.ceil(Math.sqrt(n)); i++) {
      if (n % i === 0) {
        const multipleSet = new Set(this.getMultiples(Math.floor(n / i)));
        for (const m of [...multipleSet]) {
          multipleSet.add(m * i);
        }

        const nMultiples = [...multipleSet].sort();
        this.multiples[n] = nMultiples;
        return nMultiples;
      }
    }

    const nMultiples = [1, n];
    this.multiples[n] = nMultiples;
    return nMultiples;
  }

  protected part1(input: string): SolverOutput {
    const limit = parseInt(input);

    for (let i = 2; i <= limit; i++) {
      const multiples = this.getMultiples(i);
      // this.debug(`${multiples}`);

      const multiplesSum = sum(...multiples);
      // this.debug(multiplesSum);

      if (multiplesSum > limit) {
        return i;
      }
    }
    throw new Error();
  }

  protected part2(input: string): SolverOutput {
    // this.debug(input);
    for (let i = 2; i < 15; i++) {
      this.debug(`${this.getMultiples(i)}`);
    }
    return 0;
  }
}

const getMultiplesFn = () => {
  const cache: number[][] = [[], [1], [1, 2], [1, 3]];

  const getMultiples = (n: number): number[] => {
    if (cache[n]) {
      return cache[n];
    }

    for (let i = 2; i <= n / 2; i++) {
      if (n % i === 0) {
        const multiples = getMultiples(Math.floor(n / i));
        const multipleSet = new Set(multiples);
        for (const m of multiples) {
          multipleSet.add(m * i);
        }
        const ret = [...multipleSet].sort();
        cache[n] = ret;
        return ret;
      }
    }

    const ret = [1, n];
    cache[n] = ret;
    return ret;
  };

  return getMultiples;
};

// def get_multiples_fn() -> Callable[[int], list[int]]:
//     cache: dict[int, list[int]] = {1: [1], 2: [1, 2], 3: [1, 3]}

//     def get_multiples(n: int) -> list[int]:
//         if n in cache:
//             return cache[n]
//         for i in range(2, math.ceil(math.sqrt(n))):
//             if n % i == 0:
//                 multiple_set = set(get_multiples(n // i))
//                 for m in list(multiple_set):
//                     multiple_set.add(m * i)
//                 multiples = sorted(list(multiple_set))
//                 cache[n] = multiples
//                 return multiples
//         multiples = [1, n]
//         cache[n] = multiples
//         return multiples

//     return get_multiples
