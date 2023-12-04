import { AbstractSolver, SolverOutput } from "~solver";

type Job = {
  step: string;
  doneAt: number;
};

export default class Solver extends AbstractSolver {
  samples = [];
  deps: { [k: string]: string[] } = {};
  allSteps = new Set<string>();

  parseInput(input: string) {
    for (const line of input.split("\n")) {
      const steps = (line.match(/ ([A-Z]) /g) ?? [])
        .map((s) => s.trim())
        .reverse();
      steps.forEach((step) => this.allSteps.add(step));

      if (!this.deps[steps[0]]) {
        this.deps[steps[0]] = [];
      }

      this.deps[steps[0]].push(steps[1]);
    }
  }

  protected part1(input: string): SolverOutput {
    this.parseInput(input);
    const queue = [...this.allSteps.values()].filter(
      (step) => !Object.keys(this.deps).includes(step),
    );
    const out: string[] = [];

    while (queue.length) {
      const nextStep = queue.sort().shift() ?? "";

      out.push(nextStep);
      for (const [step, depArray] of Object.entries(this.deps)) {
        if (!depArray.length) {
          delete this.deps[step];
          continue;
        } else if (!depArray.includes(nextStep)) {
          continue;
        } else if (depArray.length === 1) {
          queue.push(step);
          delete this.deps[step];
        } else {
          this.deps[step] = depArray.filter((s) => s !== nextStep);
        }
      }
    }

    return out.join("");
  }

  protected part2(input: string): SolverOutput {
    this.parseInput(input);
    const ready = [...this.allSteps.values()].filter(
      (step) => !Object.keys(this.deps).includes(step),
    );
    const inProgress: Job[] = [];
    const out: string[] = [];
    let t = 0;

    const jobFromStep = (step: string): Job => ({
      step,
      doneAt: t + step.charCodeAt(0) - 4,
    });

    while (ready.length || inProgress.length) {
      const done: string[] = [];
      for (const [i, { step, doneAt }] of inProgress.entries()) {
        if (doneAt === t) {
          done.push(step);
          inProgress.splice(i, 1);
        }
      }

      while (done.length) {
        const doneStep = done.sort().shift() ?? "";
        out.push(doneStep);
        for (const [step, depArray] of Object.entries(this.deps)) {
          if (!depArray.length) {
            delete this.deps[step];
            continue;
          } else if (!depArray.includes(doneStep)) {
            continue;
          } else if (depArray.length === 1) {
            ready.push(step);
            delete this.deps[step];
          } else {
            this.deps[step] = depArray.filter((s) => s !== doneStep);
          }
        }
      }

      while (inProgress.length < 5 && ready.length) {
        const nextStep = ready.sort().shift() ?? "";
        inProgress.push(jobFromStep(nextStep));
      }

      t++;
    }

    return t - 1;
  }
}
