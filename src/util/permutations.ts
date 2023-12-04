export const generatePermutations = <T>(input: T[]): T[][] => {
  const permutations: T[][] = [];

  const perm = (arr: T[], m: T[]) => {
    if (!arr.length) {
      permutations.push(m);
      return;
    }

    for (const i of arr.keys()) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      perm(curr.slice(), m.concat(next));
    }
  };

  perm(input, []);

  return permutations;
};
