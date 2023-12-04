import { AbstractSolver, SolverOutput } from "~solver";
import { cartesianProduct } from "~util/cartesian-product";

type Item = {
  cost: number;
  damage: number;
  armor: number;
};

class ItemStore {
  weapons: Item[] = [
    { cost: 8, damage: 4, armor: 0 },
    { cost: 10, damage: 5, armor: 0 },
    { cost: 25, damage: 6, armor: 0 },
    { cost: 40, damage: 7, armor: 0 },
    { cost: 74, damage: 8, armor: 0 },
  ];
  armor: Item[] = [
    { cost: 0, damage: 0, armor: 0 },
    { cost: 13, damage: 0, armor: 1 },
    { cost: 31, damage: 0, armor: 2 },
    { cost: 53, damage: 0, armor: 3 },
    { cost: 75, damage: 0, armor: 4 },
    { cost: 102, damage: 0, armor: 5 },
  ];
  rings: Item[] = [
    { cost: 25, damage: 1, armor: 0 },
    { cost: 50, damage: 2, armor: 0 },
    { cost: 100, damage: 3, armor: 0 },
    { cost: 20, damage: 0, armor: 1 },
    { cost: 40, damage: 0, armor: 2 },
    { cost: 80, damage: 0, armor: 3 },
  ];

  constructor() {
    for (const [i, ring1] of this.rings.slice().entries()) {
      for (const ring2 of this.rings.slice(i + 1)) {
        this.rings.push({
          cost: ring1.cost + ring2.cost,
          damage: ring1.damage + ring2.damage,
          armor: ring1.armor + ring2.armor,
        });
      }
    }
    this.rings.push({ cost: 0, damage: 0, armor: 0 });
  }

  *generateCombos() {
    const combos = cartesianProduct(this.weapons, this.armor, this.rings);
    for (const combo of combos) {
      yield combineItems(combo);
    }
  }
}

const combineItems = (items: Item[]): Item =>
  items.reduce((a, b) => ({
    cost: a.cost + b.cost,
    damage: a.damage + b.damage,
    armor: a.armor + b.armor,
  }));

class Warrior {
  hitPoints = 100;
  damage: number;
  armor: number;

  constructor(damage: number, armor: number) {
    this.damage = damage;
    this.armor = armor;
  }

  takeHit(damage: number) {
    this.hitPoints -= Math.max(1, damage - this.armor);
  }

  isDead(): boolean {
    return this.hitPoints <= 0;
  }
}

export default class Solver extends AbstractSolver {
  samples = [];

  generateBoss(): Warrior {
    return new Warrior(8, 2);
  }

  simulateBattle(warrior: Warrior): boolean {
    this.debug(
      `simulating battle with ${warrior.damage} damage, ${warrior.armor} armor`,
    );
    const boss = this.generateBoss();
    while (!warrior.isDead()) {
      boss.takeHit(warrior.damage);
      if (boss.isDead()) {
        return true;
      }
      warrior.takeHit(boss.damage);
    }
    return false;
  }

  protected part1(input: string): SolverOutput {
    const itemStore = new ItemStore();
    let minCost = Infinity;
    for (const { cost, damage, armor } of itemStore.generateCombos()) {
      if (this.simulateBattle(new Warrior(damage, armor))) {
        minCost = Math.min(cost, minCost);
      }
    }
    return minCost;
  }

  protected part2(input: string): SolverOutput {
    const itemStore = new ItemStore();
    let maxCost = -1;
    for (const { cost, damage, armor } of itemStore.generateCombos()) {
      if (!this.simulateBattle(new Warrior(damage, armor))) {
        maxCost = Math.max(cost, maxCost);
      }
    }
    return maxCost;
  }
}
