import { AbstractSolver, SolverOutput } from "~solver";
import { range } from "~util/range";

export default class Solver extends AbstractSolver {
  samples = [];
  fuelCells: number[][] = Array.from(new Array(301), () =>
    new Array(301).fill(0),
  );

  getPowerLevel(x: number, y: number, serialNumber: number) {
    const rackId = x + 10;
    return (Math.floor(((rackId * y + serialNumber) * rackId) / 100) % 10) - 5;
  }

  generateFuelCells(serialNumber: number) {
    for (const x of range(1, 301)) {
      for (const y of range(1, 301)) {
        this.fuelCells[x][y] = this.getPowerLevel(x, y, serialNumber);
      }
    }
  }

  findLargestPowerRegion(n: number): {
    maxPower: number;
    maxPowerCoord: [number, number];
  } {
    let maxPower = -Infinity;
    let maxPowerCoord: [number, number] = [0, 0];
    for (const x0 of range(1, 301 - (n - 1))) {
      for (const y0 of range(1, 301 - (n - 1))) {
        let power = 0;
        for (const x of range(x0, x0 + n)) {
          for (const y of range(y0, y0 + n)) {
            power += this.fuelCells[x][y];
          }
        }
        if (power > maxPower) {
          maxPower = power;
          maxPowerCoord = [x0, y0];
        }
      }
    }
    return { maxPower, maxPowerCoord };
  }

  findLargestNRegion(): [number, number, number] {
    let maxPower = -Infinity;
    let maxPowerCoord: [number, number] = [0, 0];
    let maxPowerN = 0;
    for (const n of range(1, 301)) {
      const powerRegion = this.findLargestPowerRegion(n);
      if (powerRegion.maxPower > maxPower) {
        maxPower = powerRegion.maxPower;
        maxPowerCoord = powerRegion.maxPowerCoord;
        maxPowerN = n;
      }
    }
    return [maxPowerCoord[0], maxPowerCoord[1], maxPowerN];
  }

  protected part1(input: string): SolverOutput {
    const serialNumber = parseInt(input);
    this.generateFuelCells(serialNumber);
    return this.findLargestPowerRegion(3).maxPowerCoord.join(",");
  }

  protected part2(input: string): SolverOutput {
    const serialNumber = parseInt(input);
    this.generateFuelCells(serialNumber);
    return this.findLargestNRegion().join(",");
  }
}
