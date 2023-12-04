import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const cycle = 349;
    const steps = 2017;

    let pointer = new Node(0);
    pointer.next = pointer;

    const dummy = new Node(0);

    for (let step = 1; step <= steps; step++) {
      for (let i = 0; i < cycle; i++) {
        pointer = pointer.next ?? dummy;
      }

      const insert: Node = new Node(step, pointer.next);
      pointer.next = insert;
      pointer = insert;
    }

    return pointer?.next?.value ?? "blorp";
  }

  protected part2(input: string): SolverOutput {
    const cycle = 349;
    const steps = 50000000;

    let pointer = new Node(0);
    pointer.next = pointer;

    const dummy = new Node(0);

    for (let step = 1; step <= steps; step++) {
      for (let i = 0; i < cycle; i++) {
        pointer = pointer.next ?? dummy;
      }

      const insert: Node = new Node(step, pointer.next);
      pointer.next = insert;
      pointer = insert;
    }

    while (pointer?.next?.value !== 0) {
      pointer = pointer.next ?? dummy;
    }

    return pointer?.next?.next?.value ?? "blorp";
  }
}

class Node {
  constructor(
    private _value: number,
    private _next: Node | null = null,
  ) {}

  get next(): Node | null {
    return this._next;
  }

  set next(node: Node | null) {
    this._next = node;
  }

  get value(): number {
    return this._value;
  }
}
