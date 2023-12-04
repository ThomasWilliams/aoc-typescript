import { AbstractSolver, SolverOutput } from "~solver";

type Battle = {
  bossHitPoints: number;
  bossDamage: number;
  mana: number;
  manaSpent: number;
  playerTurn: boolean;
  playerHitPoints: number;
  shieldTimer: number;
  poisonTimer: number;
  rechargeTimer: number;
};

export default class Solver extends AbstractSolver {
  samples = [];

  protected part1(input: string): SolverOutput {
    let minMana = Infinity;

    const initBattle: Battle = {
      bossHitPoints: 58,
      bossDamage: 9,
      mana: 500,
      manaSpent: 0,
      playerTurn: true,
      playerHitPoints: 50,
      shieldTimer: 0,
      poisonTimer: 0,
      rechargeTimer: 0,
    };

    const simulate = (battle: Battle) => {
      if (battle.manaSpent > minMana) return;
      if (battle.playerHitPoints <= 0) return;
      if (battle.mana <= 0) return;
      if (battle.bossHitPoints <= 0) {
        this.debug(`setting minMana to ${battle.manaSpent}`);
        minMana = battle.manaSpent;
        return;
      }

      // apply effects
      if (battle.shieldTimer) {
        battle.shieldTimer--;
      }
      if (battle.poisonTimer) {
        battle.bossHitPoints -= 3;
        battle.poisonTimer--;

        if (battle.bossHitPoints <= 0) {
          this.debug(`setting minMana to ${battle.manaSpent}`);
          minMana = battle.manaSpent;
          return;
        }
      }
      if (battle.rechargeTimer) {
        battle.mana += 101;
        battle.rechargeTimer--;
      }

      const {
        mana,
        manaSpent,
        bossHitPoints,
        playerHitPoints,
        playerTurn,
        shieldTimer,
        poisonTimer,
        rechargeTimer,
      } = battle;

      if (playerTurn) {
        // magic missile
        simulate({
          ...battle,
          mana: mana - 53,
          manaSpent: manaSpent + 53,
          bossHitPoints: bossHitPoints - 4,
        });

        // drain
        simulate({
          ...battle,
          mana: mana - 73,
          manaSpent: manaSpent + 73,
          bossHitPoints: bossHitPoints - 2,
          playerHitPoints: playerHitPoints + 2,
        });

        // shield
        if (!shieldTimer) {
          simulate({
            ...battle,
            mana: mana - 113,
            manaSpent: manaSpent + 113,
            shieldTimer: shieldTimer + 6,
          });
        }

        // poison
        if (!poisonTimer) {
          simulate({
            ...battle,
            mana: mana - 173,
            manaSpent: manaSpent + 173,
            poisonTimer: poisonTimer + 6,
          });
        }

        // recharge
        if (!rechargeTimer) {
          simulate({
            ...battle,
            mana: mana - 229,
            manaSpent: manaSpent + 229,
            rechargeTimer: rechargeTimer + 6,
          });
        }
      } else {
        const damage = battle.bossDamage - (battle.shieldTimer ? 7 : 0);
        const playerHitPoints = Math.max(1, battle.playerHitPoints - damage);
        simulate({ ...battle, playerHitPoints });
      }
    };

    simulate(initBattle);

    return minMana;
  }

  protected part2(input: string): SolverOutput {
    this.debug(input);
    return 0;
  }
}
