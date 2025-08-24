import {Battle, Marine, PatternCraft, Terrain, TerrainModifier, Zealot, Zergling} from "../../src";
import exp = require("node:constants");

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
  describe('battle through wall', () => {
    [
      {hero: new Marine(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
      {hero: new Marine(), enemy: new Zealot(), heroHealth: 2, enemyHealth: 0},
      {hero: new Zergling(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 1, enemyHealth: 3},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 3, enemyHealth: 1},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`battle knows 1 ${hero.name} fights 1 ${enemy.name}`, () => {

        [hero, enemy] = Battle([hero, enemy], 'wall');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    })
  });
  describe('Battle through hill', () => {
    [
      {hero: new Marine(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
      {hero: new Marine(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 1},
      {hero: new Zergling(), enemy: new Marine(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Marine(), heroHealth: 1, enemyHealth: 0},
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`battle knows 1 ${hero.name} fights 1 ${enemy.name}`, () => {

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
      {hero: new Zergling(), enemy: new Zealot(), heroHealth: 0, enemyHealth: 2},
      {hero: new Zealot(), enemy: new Zergling(), heroHealth: 2, enemyHealth: 0},
    ].forEach(({enemy, hero, heroHealth, enemyHealth}) => {
      it(`battle knows 1 ${hero.name} fights 1 ${enemy.name}`, () => {

        [hero, enemy] = Battle([hero, enemy], 'flatland');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    })
  })
});

describe('Terrain', () => {
  [
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'wall', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'wall', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'wall', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'wall', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'wall', heroHealth: 3, enemyHealth: 1 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'wall', heroHealth: 1, enemyHealth: 3 },
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'hill', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'hill', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'hill', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'hill', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'hill', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'hill', heroHealth: 0, enemyHealth: 2 },
    { hero: [new Marine()], enemy: [new Zealot()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Marine()], enemy: [new Zergling()], terrainType: 'flatland', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zealot()], enemy: [new Marine()], terrainType: 'flatland', heroHealth: 1, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Marine()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 1 },
    { hero: [new Zealot()], enemy: [new Zergling()], terrainType: 'flatland', heroHealth: 2, enemyHealth: 0 },
    { hero: [new Zergling()], enemy: [new Zealot()], terrainType: 'flatland', heroHealth: 0, enemyHealth: 2 },
  ].forEach(({hero, enemy, terrainType, heroHealth, enemyHealth}) => {
    it(`${hero[0].name} should battle ${enemy[0].name} with terrain modifier ${terrainType}`, () => {

      const { heroes, enemies } = Terrain(hero, enemy, terrainType);

      expect(heroes[0].health).toEqual(heroHealth);
      expect(enemies[0].health).toEqual(enemyHealth);
    });
  });
  [
    { heroes: [new Marine(), new Marine()], enemies: [new Zealot()], terrainType: 'wall', heroHealth: [2, 2], enemyHealth: [0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'wall', heroHealth: [2], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'hill', heroHealth: [2], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 0] },
    { heroes: [new Marine()], enemies: [new Zergling(), new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 0, 1] },
    { heroes: [new Zealot()], enemies: [new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [1], enemyHealth: [0, 0] },
    { heroes: [new Zealot()], enemies: [new Zergling(), new Zergling(), new Zergling()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 0, 0] },
    { heroes: [new Marine(), new Marine()], enemies: [new Zealot(), new Zealot()], terrainType: 'flatland', heroHealth: [0], enemyHealth: [0, 3] },
  ].forEach(({heroes, enemies, terrainType, heroHealth, enemyHealth}) => {
    it(`${heroes.length} number of heroes should battle ${enemies.length} with terrain modifier ${terrainType}`, () => {

      const { heroes: heroResult, enemies: enemyResult } = Terrain(heroes, enemies, terrainType);

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
