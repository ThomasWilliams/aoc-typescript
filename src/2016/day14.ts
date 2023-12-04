import { AbstractSolver, SolverOutput } from "~solver";
import { createHash } from "crypto";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const decoder = new Decoder(input);
    let found = 0;
    let i = -1;
    while (found < 64) {
      if (decoder.indexIsValid(++i)) found++;
    }
    return i;
  }

  protected part2(input: string): SolverOutput {
    const decoder = new Decoder(input, true);
    let found = 0;
    let i = -1;
    while (found < 64) {
      if (decoder.indexIsValid(++i)) found++;
    }
    return i;
  }
}

class Decoder {
  hashes: string[] = [];
  fiveInARowCache = new Map<string, string[]>();

  constructor(
    private salt: string,
    private stretch = false,
  ) {}

  getHash(n: number): string {
    if (this.hashes[n]) return this.hashes[n];

    let hash = createHash("md5").update(`${this.salt}${n}`).digest("hex");

    if (this.stretch) {
      for (let i = 0; i < 2016; i++) {
        hash = createHash("md5").update(hash).digest("hex");
      }
    }

    this.hashes[n] = hash;
    return hash;
  }

  hasFiveInARow(index: number, str: string): boolean {
    const key = this.getHash(index);
    if (this.fiveInARowCache.has(key)) {
      return (this.fiveInARowCache.get(key) ?? []).includes(str);
    }

    const matchChars = [...key.matchAll(/(.)\1{4}/g)].map((m) => m[1]);

    this.fiveInARowCache.set(key, matchChars);
    return matchChars.includes(str);
  }

  getThreeInARowChar(hash: string): string | null {
    for (let i = 0; i < hash.length - 2; i++) {
      const ch = hash.charAt(i);
      if (hash.charAt(i + 1) === ch && hash.charAt(i + 2) === ch) {
        return ch;
      }
    }
    return null;
  }

  indexIsValid(index: number): boolean {
    const hash = this.getHash(index);
    const ch = this.getThreeInARowChar(hash);
    if (ch === null) return false;

    for (let j = index + 1; j <= index + 1000; j++) {
      if (this.hasFiveInARow(j, ch)) {
        return true;
      }
    }
    return false;
  }
}
