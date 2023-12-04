export function* range(start: number, end?: number, step: number = 1) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    yield i;
  }
}
