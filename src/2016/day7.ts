import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [
    `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`,
  ];
  hypernetRegex = /\[([a-z]+)\]/g;
  regularRegex = /\[[a-z]+\]/g;

  hasAbba(s: string): boolean {
    for (let i = 3; i < s.length; i++) {
      if (s[i - 3] === s[i] && s[i - 2] === s[i - 1] && s[i] !== s[i - 1]) {
        return true;
      }
    }
    return false;
  }

  getAbaPairs(seqs: string[]): Array<[string, string]> {
    const abaPairs = [];
    for (const seq of seqs) {
      for (let i = 2; i < seq.length; i++) {
        if (seq[i] === seq[i - 2] && seq[i] !== seq[i - 1]) {
          abaPairs.push([seq[i], seq[i - 1]] as [string, string]);
        }
      }
    }
    return abaPairs;
  }

  checkForBab(seqs: string[], [a, b]: [string, string]): boolean {
    for (const seq of seqs) {
      for (let i = 2; i < seq.length; i++) {
        if (seq[i] === seq[i - 2] && seq[i] === b && seq[i - 1] === a) {
          return true;
        }
      }
    }
    return false;
  }

  supportsTLS(s: string): boolean {
    const hypernetSeqs: string[] = s.match(this.hypernetRegex) ?? [];
    const regularSeqs: string[] = s.split(this.regularRegex);

    for (const seq of hypernetSeqs) {
      if (this.hasAbba(seq)) {
        return false;
      }
    }

    for (const seq of regularSeqs) {
      if (this.hasAbba(seq)) {
        return true;
      }
    }

    return false;
  }

  supportsSSL(s: string): boolean {
    const hypernetSeqs: string[] = s.match(this.hypernetRegex) ?? [];
    const regularSeqs: string[] = s.split(this.regularRegex);
    const abaPairs = this.getAbaPairs(regularSeqs);

    for (const abaPair of abaPairs) {
      if (this.checkForBab(hypernetSeqs, abaPair)) {
        return true;
      }
    }

    return false;
  }

  protected part1(input: string): SolverOutput {
    return input.split("\n").filter((line) => this.supportsTLS(line)).length;
  }

  protected part2(input: string): SolverOutput {
    return input.split("\n").filter((line) => this.supportsSSL(line)).length;
  }
}
