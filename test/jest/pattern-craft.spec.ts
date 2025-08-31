import {Battle, PatternCraft, War, TerrainModifier, Turn} from "../../src";
import exp = require("node:constants");
import {Marine, Zealot, Zergling} from "../../src/units";

describe('Pattern Craft', () => {
  it(`marine should defeat zerg when one marine fight one zergling`, () => {
    let marine = new Marine();
    let zergling = new Zergling();

    const { heroes: marineAfterBattle, enemies: zerglingAfterBattle } = PatternCraft([marine, zergling]);

    expect(marineAfterBattle[0].health).toEqual(1);
    expect(zerglingAfterBattle[0].health).toBeLessThanOrEqual(0);

  })
  it(`With a wall, a marine should defeat zerg when one marine fight one zergling`, () => {
    let marine = new Marine();
    let zergling = new Zergling();

    const { heroes: marineAfterBattle, enemies: zerglingAfterBattle } = PatternCraft([marine, zergling], 'wall');

    expect(marineAfterBattle[0].health).toEqual(2);
    expect(zerglingAfterBattle[0].health).toBeLessThanOrEqual(0);

  })
  it(`On a hill, marine should defeat zerg when one marine fight one zergling`, () => {
    let marine = new Marine();
    let zergling = new Zergling();

    const { heroes: marineAfterBattle, enemies: zerglingAfterBattle } = PatternCraft([marine, zergling], 'hill');

    expect(marineAfterBattle[0].health).toEqual(2);
    expect(zerglingAfterBattle[0].health).toBeLessThanOrEqual(0);

  })
  it(`zealot should defeat marine when one zealot fight one marine`, () => {
    const units = PatternCraft(
      [new Zealot(), new Marine()]);

    expect(units.heroes[0].health).toBeGreaterThan(0);
    expect(units.heroes[0].name).toBe('zealot');
  })
  it(`zealot should defeat zerg`, () => {
    const units = PatternCraft(
      [new Zealot(), new Zergling()]);

    expect(units.heroes[0].name).toBe('zealot');
    expect(units.heroes[0].health).toBeGreaterThan(0);
    expect(units.enemies[0].name).toBe('zergling');
    expect(units.enemies[0].health).toBeLessThanOrEqual(0);
  })
})

describe('Battle on flatland', () => {
  it('battle knows 1 marine beats 1 zergling', () => {
    let marine = new Marine();
    let zergling = new Zergling();

    [marine, zergling] = Battle([marine, zergling]);

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeGreaterThan(0);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
  it('battle knows 1 marine beats 1 zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();

    [marine, zealot] = Battle([marine, zealot]);

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeLessThanOrEqual(0);
    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeGreaterThan(0);
  })
  it('battle knows 1 zealot beats 1 zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();

    [zealot, zergling] = Battle([zealot, zergling]);

    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeGreaterThan(0);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
})

describe('Battle', () => {
  describe('on terrain wall', () => {
    [
      {hero: new Marine(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
      {hero: new Marine(), enemy: new Zealot(), heroHealth: 2, enemyHealth: 0},
      {hero: new Zergling(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 2, enemyHealth: 4},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 4, enemyHealth: 2},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`given ${hero.name} fights ${enemy.name} then hero health is ${heroHealth} and enemy is ${enemyHealth}`, () => {

        [hero, enemy] = Battle([hero, enemy], 'wall');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    })
  });
  describe('on terrain hill', () => {
    [
      {hero: new Marine(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
      {hero: new Marine(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 1},
      {hero: new Zergling(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Marine(), heroHealth: 1, enemyHealth: 0},
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 3},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 3, enemyHealth: 0},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`given ${hero.name} fights ${enemy.name} then hero health is ${heroHealth} and enemy is ${enemyHealth}`, () => {

        [hero, enemy] = Battle([hero, enemy], 'hill');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    });
  });
  describe('Battle through flatland', () => {
    [
      {hero: new Marine(), enemy: new Zergling(), heroHealth: 1, enemyHealth: 0},
      {hero: new Marine(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 1},
      {hero: new Zergling(), enemy: new Marine(), heroHealth: 0, enemyHealth: 1},
      {hero: new Zealot(), enemy: new Marine(), heroHealth: 1, enemyHealth: 0},
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 3},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 3, enemyHealth: 0},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`battle knows 1 ${hero.name} fights 1 ${enemy.name}`, () => {

        [hero, enemy] = Battle([hero, enemy], 'flatland');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    })
  })
});

describe('War', () => {
  [
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'wall', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'wall', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'wall', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'wall', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'wall', heroHealth: 4, enemyHealth: 2 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'wall', heroHealth: 2, enemyHealth: 4 },
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'hill', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'hill', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'hill', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'hill', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'hill', heroHealth: 3, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'hill', heroHealth: 0, enemyHealth: 3 },
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'flatland', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'flatland', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'flatland', heroHealth: 3, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 3 },
  ].forEach(({hero, enemy, terrainType, heroHealth, enemyHealth}) => {
    it(`given ${hero[0].name} battles ${enemy[0].name} with terrain modifier ${terrainType} then hero health is ${heroHealth} and enemy health is ${enemyHealth}`, () => {

      const { heroes, enemies } = War(hero, enemy, terrainType);

      expect(heroes[0].health).toEqual(heroHealth);
      expect(enemies[0].health).toEqual(enemyHealth);
    });
  });
  [
    { heroes: [new Marine(), new Marine()], enemies: [new Zealot()], terrainType: 'wall', heroHealth: [2, 2], enemyHealth: [0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'wall', heroHealth: [2], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'hill', heroHealth: [2], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 0, 2] },
    { heroes: [new Zealot()], enemies: [new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [2], enemyHealth: [0, 0] },
    { heroes: [new Zealot()], enemies: [new Zergling(), new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [1], enemyHealth: [0, 0, 0] },
    { heroes: [new Marine(), new Marine()], enemies: [new Zealot(), new Zealot()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 4] },
  ].forEach(({heroes, enemies, terrainType, heroHealth, enemyHealth}) => {
    it(`${heroes.length} number of heroes should battle ${enemies.length} with terrain modifier ${terrainType}`, () => {

      const { heroes: heroResult, enemies: enemyResult } = War(heroes, enemies, terrainType);

      heroHealth.forEach((hero, idx) => expect(heroResult[idx].health).toEqual(hero))
      enemyHealth.forEach((enemy, idx) => expect(enemyResult[idx].health).toEqual(enemy))
    })
  })
})

describe('TerrainModifiers', () => {
  it('wall modifier determines damage between zergling and marine', () => {
    let marine = new Marine();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = TerrainModifier([marine, zergling], 'wall');

    expect(heroModifier).toEqual(-1)
    expect(enemyModifier).toEqual(3)
  })
  it('wall modifier determines damage between marine and zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();

    const [heroModifier, enemyModifier] = TerrainModifier([marine, zealot], 'wall');

    expect(heroModifier).toEqual(-1)
    expect(enemyModifier).toEqual(3)
  })
  it('wall modifier determines damage between zealot and zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = TerrainModifier([zealot, zergling], 'wall');

    expect(heroModifier).toEqual(3)
    expect(enemyModifier).toEqual(3)
  })
  it('hill modifier determines damage between zergling and marine', () => {
    let marine = new Marine();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = TerrainModifier([marine, zergling], 'hill');

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(1)
  })
  it('hill modifier determines damage between marine and zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();

    const [heroModifier, enemyModifier] = TerrainModifier([marine, zealot], 'hill');

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(0)
  })
  it('hill modifier determines damage between zealot and zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = TerrainModifier([zealot, zergling], 'hill');

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(0)
  })
})

describe('Turn', () => {
  describe('flatland', () => {
        it('captures damage between zerglings and zealots', () => {
      const zergling = new Zergling();
      const zealot = new Zealot();
      const [zerglingTurnOne, zealotTurnOne] = Turn(zergling, zealot, 'flatland');
      expect(zerglingTurnOne.health).toEqual(2);
      expect(zealotTurnOne.health).toEqual(4);

      const [zerglingTurnTwo, zealotTurnTwo] = Turn(zergling, zealot, 'flatland');

      expect(zerglingTurnTwo.health).toEqual(1);
      expect(zealotTurnTwo.health).toEqual(3);
      const [zerglingTurnThree, zealotTurnThree] = Turn(zerglingTurnTwo, zealotTurnTwo, 'flatland');
      expect(zerglingTurnThree.canAttack).toBe(false);
      expect(zealotTurnThree.canAttack).toBe(false);
    })
    it('captures damage between marines and zealots', () => {
      const marine = new Marine();
      const zealot = new Zealot();

      const [marineResult, zealotResult] = Turn(marine, zealot, 'flatland');

      expect(marineResult.health).toEqual(2);
      expect(zealotResult.health).toEqual(3);
    })
    it('captures damage between marines and zealots after 3 turns', () => {
      const marine = new Marine();
      const zealot = new Zealot();
      const [marineTurnOne, zealotTurnOne] = Turn(marine, zealot, 'flatland');
      const [marineTurnTwo, zealotTurnTwo] = Turn(marineTurnOne, zealotTurnOne, 'flatland');
      expect(marineTurnTwo.health).toEqual(1);
      expect(zealotTurnTwo.health).toEqual(2);

      const [marineTurnThree, zealotTurnThree] = Turn(marineTurnOne, zealotTurnOne, 'flatland');

      expect(marineTurnThree.health).toEqual(0);
      expect(zealotTurnThree.health).toEqual(1);
      expect(marineTurnThree.canAttack).toEqual(true);
      expect(zealotTurnThree.canAttack).toEqual(false);
    })
    it('captures damage between marine and 2 zerglings after 4 turns', () => {
      const marine = new Marine();
      const zerglingOne = new Zergling();
      const zerglingTwo = new Zergling();
      const [marineTurnOne, zerglingTurnOne] = Turn(marine, zerglingOne, 'flatland');
      const [marineTurnTwo, zerglingTurnTwo] = Turn(marineTurnOne, zerglingTurnOne, 'flatland');
      expect(marineTurnTwo.health).toEqual(1);
      expect(zerglingTurnTwo.health).toEqual(0);
      expect(marineTurnTwo.canAttack).toEqual(true);
      expect(zerglingTurnTwo.canAttack).toEqual(false);

      const [marineTurnThree, zealotTwoTurnThree] = Turn(marineTurnTwo, zerglingTwo, 'flatland');

      expect(marineTurnThree.health).toEqual(1);
      expect(zealotTwoTurnThree.health).toEqual(1);

      const [marineTurnFour, zealotTurnFour] = Turn(marineTurnThree, zealotTwoTurnThree, 'flatland');

      expect(marineTurnFour.health).toEqual(0);
      expect(zealotTurnFour.health).toEqual(0);
    })
  })
  describe('hill', () => {
        it('captures damage between zerglings and zealots', () => {
      const zergling = new Zergling();
      const zealot = new Zealot();
      const [zerglingTurnOne, zealotTurnOne] = Turn(zergling, zealot, 'hill');
      expect(zerglingTurnOne.health).toEqual(2);
      expect(zealotTurnOne.health).toEqual(4);

      const [zerglingTurnTwo, zealotTurnTwo] = Turn(zergling, zealot, 'hill');

      expect(zerglingTurnTwo.health).toEqual(1);
      expect(zealotTurnTwo.health).toEqual(3);
      const [zerglingTurnThree, zealotTurnThree] = Turn(zerglingTurnTwo, zealotTurnTwo, 'hill');
      expect(zerglingTurnThree.canAttack).toBe(false);
      expect(zealotTurnThree.canAttack).toBe(false);
    })
    it('captures damage between marines and zealots', () => {
      const marine = new Marine();
      const zealot = new Zealot();

      const [marineResult, zealotResult] = Turn(marine, zealot, 'hill');

      expect(marineResult.health).toEqual(2);
      expect(zealotResult.health).toEqual(3);
    })
    it('captures damage between marines and zealots after 3 turns', () => {
      const marine = new Marine();
      const zealot = new Zealot();
      const [marineTurnOne, zealotTurnOne] = Turn(marine, zealot, 'hill');
      const [marineTurnTwo, zealotTurnTwo] = Turn(marineTurnOne, zealotTurnOne, 'hill');
      expect(marineTurnTwo.health).toEqual(1);
      expect(zealotTurnTwo.health).toEqual(2);

      const [marineTurnThree, zealotTurnThree] = Turn(marineTurnOne, zealotTurnOne, 'hill');

      expect(marineTurnThree.health).toEqual(0);
      expect(zealotTurnThree.health).toEqual(1);
      expect(marineTurnThree.canAttack).toEqual(true);
      expect(zealotTurnThree.canAttack).toEqual(false);
    })
    it('captures damage between marine and 2 zerglings after 4 turns', () => {
      let marine = new Marine();
      let zerglingOne = new Zergling();
      let zerglingTwo = new Zergling();
      [marine, zerglingOne] = Turn(marine, zerglingOne, 'hill');
      [marine, zerglingOne] = Turn(marine, zerglingOne, 'hill');
      expect(marine.health).toEqual(2);
      expect(zerglingOne.health).toEqual(0);
      expect(marine.canAttack).toEqual(true);
      expect(zerglingOne.canAttack).toEqual(false);

      [marine, zerglingTwo] = Turn(marine, zerglingTwo, 'hill');

      expect(marine.health).toEqual(2);
      expect(zerglingTwo.health).toEqual(1);

      [marine,zerglingTwo] = Turn(marine, zerglingTwo, 'hill');

      expect(marine.health).toEqual(2);
      expect(zerglingTwo.health).toEqual(0);
    })
  })
  describe('wall', () => {
        it('captures damage between zerglings and zealots', () => {
      const zergling = new Zergling();
      const zealot = new Zealot();
      const [zerglingTurnOne, zealotTurnOne] = Turn(zergling, zealot, 'wall');
      expect(zerglingTurnOne.health).toEqual(2);
      expect(zealotTurnOne.health).toEqual(4);

      const [zerglingTurnTwo, zealotTurnTwo] = Turn(zergling, zealot, 'wall');

      expect(zerglingTurnTwo.health).toEqual(2);
      expect(zealotTurnTwo.health).toEqual(4);
      expect(zerglingTurnTwo.canAttack).toBe(false);
      expect(zealotTurnTwo.canAttack).toBe(false);
    })
    it('captures damage between marines and zealots', () => {
      const marine = new Marine();
      const zealot = new Zealot();

      const [marineResult, zealotResult] = Turn(marine, zealot, 'wall');

      expect(marineResult.health).toEqual(2);
      expect(zealotResult.health).toEqual(2);
    })
    it('captures damage between marines and zealots after 3 turns', () => {
      const marine = new Marine();
      const zealot = new Zealot();
      const [marineTurnOne, zealotTurnOne] = Turn(marine, zealot, 'wall');
      const [marineTurnTwo, zealotTurnTwo] = Turn(marineTurnOne, zealotTurnOne, 'wall');
      expect(marineTurnTwo.health).toEqual(2);
      expect(zealotTurnTwo.health).toEqual(0);

      const [marineTurnThree, zealotTurnThree] = Turn(marineTurnOne, zealotTurnOne, 'wall');

      expect(marineTurnThree.health).toEqual(2);
      expect(zealotTurnThree.health).toEqual(0);
      expect(marineTurnThree.canAttack).toEqual(true);
      expect(zealotTurnThree.canAttack).toEqual(false);
    })
    it('captures damage between marine and 2 zerglings after 4 turns', () => {
      let marine = new Marine();
      let zerglingOne = new Zergling();
      let zerglingTwo = new Zergling();
      [marine, zerglingOne] = Turn(marine, zerglingOne, 'wall');
      [marine, zerglingOne] = Turn(marine, zerglingOne, 'wall');
      expect(marine.health).toEqual(2);
      expect(zerglingOne.health).toEqual(0);
      expect(marine.canAttack).toEqual(true);
      expect(zerglingOne.canAttack).toEqual(false);

      [marine, zerglingTwo] = Turn(marine, zerglingTwo, 'wall');

      // expect(marine.health).toEqual(2);
      // expect(zerglingTwo.health).toEqual(0);

      [marine, zerglingTwo] = Turn(marine, zerglingTwo, 'wall');

      // expect(marineTurnFour.health).toEqual(2);
      // expect(zerglingTurnFour.health).toEqual(0);
    })
  })
})
