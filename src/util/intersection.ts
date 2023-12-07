export const intersection = <T>(a: T[], b: T[]): T[] =>
  a.filter((x) => b.includes(x));
