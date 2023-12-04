import { AbstractSolver, SolverOutput } from "~solver";

type Node = {
  size: number;
  used: number;
  available: number;
  usage: number;
};

type FullNode = Node & { location: [number, number] };

class Grid {
  nodes: Node[][] = [];

  constructor(fullNodes: FullNode[]) {
    for (const { size, used, available, usage, location } of fullNodes) {
      const [x, y] = location;
      if (!this.nodes[x]) this.nodes[x] = [];
      this.nodes[x][y] = { size, used, available, usage };
    }
  }

  print(): string {
    return this.nodes
      .map(
        (row, i) =>
          i +
          row
            .map((node) => {
              if (node.used === 0) {
                return "_";
              } else if (node.used > 100) {
                return "#";
              } else {
                return ".";
              }
            })
            .join(""),
      )
      .join("\n");
  }
}

export default class Solver extends AbstractSolver {
  samples = [];
  nodes: FullNode[] = [];

  parseNodes(input: string) {
    for (const line of input.split("\n").slice(2)) {
      const parts = line.split(/[\s]+/);
      const [x, y] = parts[0]
        .split("-")
        .slice(1)
        .map((d) => parseInt(d.slice(1)));
      const location: [number, number] = [x, y];
      const size = parseInt(parts[1].slice(0, -1));
      const used = parseInt(parts[2].slice(0, -1));
      const available = parseInt(parts[3].slice(0, -1));
      const usage = parseInt(parts[4].slice(0, -1));
      this.nodes.push({ size, used, available, usage, location });
    }
  }

  protected part1(input: string): SolverOutput {
    this.parseNodes(input);
    let pairs = 0;

    for (let i = 0; i < this.nodes.length - 1; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        if (
          (this.nodes[i].used > 0 &&
            this.nodes[i].used <= this.nodes[j].available) ||
          (this.nodes[j].used > 0 &&
            this.nodes[j].used <= this.nodes[i].available)
        ) {
          pairs++;
        }
      }
    }

    return pairs;
  }

  protected part2(input: string): SolverOutput {
    this.parseNodes(input);
    const grid = new Grid(this.nodes);
    this.debug(grid.print());
    return 0;
  }
}
