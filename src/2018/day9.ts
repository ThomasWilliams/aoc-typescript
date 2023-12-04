import { AbstractSolver, DebugFn, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = ["9, 25"];

  getWinningScore(playerCount: number, highestMarble: number): number {
    const marbles: number[] = [0, 1];
    const scores = Array(playerCount).fill(0);

    let pointer = 1;

    const movePointer = (n: number) => {
      pointer += n;
      if (pointer < 0) pointer += marbles.length;
      if (pointer >= marbles.length) pointer -= marbles.length;
    };

    for (let i = 2; i <= highestMarble; i++) {
      if (i % 23 === 0) {
        movePointer(-7);
        const player = i % playerCount;
        scores[player] += i + marbles.splice(pointer, 1)[0];
        if (pointer === marbles.length) pointer = 0;
      } else {
        movePointer(2);
        marbles.splice(pointer, 0, i);
      }
    }

    return scores.reduce((a, b) => Math.max(a, b));
  }

  getWinningScore2(playerCount: number, highestMarble: number): number {
    const scores = Array(playerCount).fill(0);
    const circle = new Circle(0, this.debug);
    circle.insert(1);
    for (const i of range(2, highestMarble + 1)) {
      if (i % 23 === 0) {
        circle.move(-7);
        const player = i % playerCount;
        scores[player] += i + circle.pop();
      } else {
        circle.move(1);
        circle.insert(i);
      }
    }

    this.debug(String(scores));

    return scores.reduce((a, b) => Math.max(a, b));
  }

  protected part1(input: string): SolverOutput {
    const [playerCount, highestMarble] = (input.match(/[\d]+/g) ?? []).map(
      (n) => parseInt(n),
    );
    return this.getWinningScore2(playerCount, highestMarble);
  }

  protected part2(input: string): SolverOutput {
    const [playerCount, highestMarble] = (input.match(/[\d]+/g) ?? []).map(
      (n) => parseInt(n),
    );
    return this.getWinningScore2(playerCount, highestMarble * 100);
  }
}

class Node {
  next: Node;
  prev: Node;
  constructor(public value: number) {
    this.next = this;
    this.prev = this;
  }
}

class Circle {
  head: Node;

  constructor(
    firstValue: number,
    private debug: DebugFn = () => {},
  ) {
    this.head = new Node(firstValue);
  }

  insert(value: number) {
    const newNode = new Node(value);
    newNode.next = this.head.next;
    newNode.prev = this.head;
    this.head.next.prev = newNode;
    this.head.next = newNode;
    this.head = newNode;
    this.debug(
      `inserting ${newNode.value} between ${newNode.prev.value} and ${newNode.next.value}`,
    );
  }

  pop(): number {
    const value = this.head.value;
    this.head.next.prev = this.head.prev;
    this.head.prev.next = this.head.next;
    this.head = this.head.next;
    return value;
  }

  move(n: number) {
    const backwards = n < 0;
    for (const _ of range(Math.abs(n))) {
      this.head = backwards ? this.head.prev : this.head.next;
    }
    this.debug(`moved ${n}; head is now ${this.head.value}`);
  }
}
