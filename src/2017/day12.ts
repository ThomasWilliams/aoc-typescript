import { AbstractSolver, SolverOutput } from "~solver";

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    const graph = new Graph(input.split("\n"));
    return graph.getGroupWithNode(0).length;
  }

  protected part2(input: string): SolverOutput {
    const graph = new Graph(input.split("\n"));
    return graph.findAllGroups().length;
  }
}

class Graph {
  adjacencyMatrix: number[][];

  constructor(lines: string[]) {
    this.adjacencyMatrix = [];
    for (const line of lines) {
      const nums = (line.match(/([\d]+)/g) ?? []).map((n) => parseInt(n));
      this.adjacencyMatrix[nums[0]] = nums.slice(1);
    }
  }

  getGroupWithNode(startingNode: number): number[] {
    const connected = new Set<number>();

    const walk = (node: number, visited: number[] = []) => {
      connected.add(node);
      for (const child of this.adjacencyMatrix[node]) {
        if (!visited.includes(child)) {
          walk(child, visited.concat(child));
        }
      }
    };

    walk(startingNode);

    return [...connected];
  }

  findAllGroups(): number[][] {
    let pos = 0;
    const groups: number[][] = [];
    while (pos < this.adjacencyMatrix.length) {
      groups.push(this.getGroupWithNode(pos));

      while (groups.some((group) => group.includes(pos))) {
        pos++;
      }
    }
    return groups;
  }
}
