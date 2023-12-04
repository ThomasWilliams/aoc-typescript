import { AbstractSolver, SolverOutput } from "../solver";

export default class Solver extends AbstractSolver {
  samples = [
    `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,
  ];
  graph: Record<string, Array<[string, number]>> = {};

  buildGraph(lines: string[]) {
    for (const line of lines) {
      const [a, rest] = line.split(" to ");
      const [b, d] = rest.split(" = ");
      const distance = parseInt(d);
      if (!this.graph[a]) {
        this.graph[a] = [];
      }
      if (!this.graph[b]) {
        this.graph[b] = [];
      }
      this.graph[a].push([b, distance]);
      this.graph[b].push([a, distance]);
    }
  }

  findShortestDistance(city: string, visited: string[] = []): number {
    if (visited.length === Object.keys(this.graph).length - 1) return 0;
    return this.graph[city]
      .filter(([dest]) => !visited.includes(dest))
      .map(
        ([next, distance]) =>
          distance + this.findShortestDistance(next, [...visited, city]),
      )
      .reduce((a, b) => Math.min(a, b), Infinity);
  }

  findLongestDistance(city: string, visited: string[] = []): number {
    if (visited.length === Object.keys(this.graph).length - 1) return 0;
    return this.graph[city]
      .filter(([dest]) => !visited.includes(dest))
      .map(
        ([next, distance]) =>
          distance + this.findLongestDistance(next, [...visited, city]),
      )
      .reduce((a, b) => Math.max(a, b), -Infinity);
  }

  protected part1(input: string): SolverOutput {
    this.buildGraph(input.split("\n"));
    return Object.keys(this.graph)
      .map((city) => this.findShortestDistance(city))
      .reduce((a, b) => Math.min(a, b));
  }

  protected part2(input: string): SolverOutput {
    this.buildGraph(input.split("\n"));
    return Object.keys(this.graph)
      .map((city) => this.findLongestDistance(city))
      .reduce((a, b) => Math.max(a, b));
  }
}
