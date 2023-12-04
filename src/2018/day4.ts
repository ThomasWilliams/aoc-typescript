import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";
import { sum } from "~util/sum";

type Event = {
  date: Date;
  message: string;
};

export default class Solver extends AbstractSolver {
  samples = [
    `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`,
  ];

  parseInput(input: string): Event[] {
    return input
      .split("\n")
      .map((line) => {
        const [dateStr, message] = line.slice(1).split("] ");
        const date = new Date(dateStr);
        return { date, message };
      })
      .toSorted((a, b) => a.date.valueOf() - b.date.valueOf());
  }

  getSleepMinutes(events: Event[]): Record<string, number[]> {
    const sleepMinutes: Record<string, number[]> = {};
    let guardNumber = "dummy";
    let asleep = 0;
    for (const { date, message } of events) {
      this.debug(message);

      if (message.startsWith("Guard")) {
        guardNumber = message.split(" ")[1];
      } else if (message.startsWith("falls")) {
        asleep = date.getMinutes();
      } else if (message.startsWith("wakes")) {
        const wake = date.getMinutes();
        if (!sleepMinutes[guardNumber]) {
          sleepMinutes[guardNumber] = Array(60).fill(0);
        }
        for (const t of range(asleep, wake)) {
          sleepMinutes[guardNumber][t]++;
        }
      }
    }
    return sleepMinutes;
  }

  protected part1(input: string): SolverOutput {
    const events = this.parseInput(input);
    const sleepMinutes = this.getSleepMinutes(events);

    const [sleepiestGuardNumber] = Object.entries(sleepMinutes)
      .map(
        ([guardNumber, sleepMin]) =>
          [guardNumber, sum(...sleepMin)] as [string, number],
      )
      .reduce((a, b) => (a[1] > b[1] ? a : b));

    return (
      [...sleepMinutes[sleepiestGuardNumber].entries()].reduce((a, b) =>
        a[1] > b[1] ? a : b,
      )[0] * parseInt(sleepiestGuardNumber.slice(1))
    );
  }

  protected part2(input: string): SolverOutput {
    const events = this.parseInput(input);
    const sleepMinutes = this.getSleepMinutes(events);

    const [sleepPeakGuardNumber] = Object.entries(sleepMinutes)
      .map(
        ([guardNumber, sleepMin]) =>
          [guardNumber, Math.max(...sleepMin)] as [string, number],
      )
      .reduce((a, b) => (a[1] > b[1] ? a : b));

    return (
      [...sleepMinutes[sleepPeakGuardNumber].entries()].reduce((a, b) =>
        a[1] > b[1] ? a : b,
      )[0] * parseInt(sleepPeakGuardNumber.slice(1))
    );
  }
}
