export const sum = (first?: number | number[], ...nums: number[]): number =>
  !first
    ? 0
    : (Array.isArray(first) ? first : [first])
        .concat(nums)
        .reduce((a, b) => a + b);
