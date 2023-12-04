export const getLetterCounts = (name: string): { [k: string]: number } =>
  name
    .split("")
    .filter((ch) => ch !== "-")
    .reduce(
      (counts, ch) => ({ ...counts, [ch]: (counts[ch] || 0) + 1 }),
      {} as { [k: string]: number },
    );
