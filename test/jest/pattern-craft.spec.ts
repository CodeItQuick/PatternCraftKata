import {Battle, Marine, PatternCraft, Terrain, TerrainModifier, Zealot, Zergling} from "../../src";

describe('Pattern Craft', () => {
  // let theory = [
  //   { something: 'something' }
  // ]
  // theory.forEach(x => {
  it(`marine should defeat zerg when one marine fight one zergling`, () => {
    const patternCraft = new PatternCraft();
    let marine = new Marine();
    let zergling = new Zergling();

    const [marineAfterBattle, zerglingAfterBattle] = patternCraft.takeTurn([marine, zergling]);

    expect(marineAfterBattle.health).toEqual(1);
    expect(zerglingAfterBattle.health).toBeLessThanOrEqual(0);

  })
  it(`With a wall, a marine should defeat zerg when one marine fight one zergling`, () => {
    const patternCraft = new PatternCraft();
    let marine = new Marine();
    let zergling = new Zergling();

    const [marineAfterBattle, zerglingAfterBattle] = patternCraft.takeTurn([marine, zergling], 'wall');

    expect(marineAfterBattle.health).toEqual(2);
    expect(zerglingAfterBattle.health).toBeLessThanOrEqual(0);

  })
  it(`On a hill, marine should defeat zerg when one marine fight one zergling`, () => {
    const patternCraft = new PatternCraft();
    let marine = new Marine();
    let zergling = new Zergling();

    const [marineAfterBattle, zerglingAfterBattle] = patternCraft.takeTurn([marine, zergling], 'hill');

    expect(marineAfterBattle.health).toEqual(2);
    expect(zerglingAfterBattle.health).toBeLessThanOrEqual(0);

  })
  it(`zealot should defeat marine when one zealot fight one marine`, () => {
    const patternCraft = new PatternCraft();

    const units = patternCraft.takeTurn(
      [new Zealot(), new Marine()]);

    expect(units[0].health).toBeGreaterThan(0);
    expect(units[0].name).toBe('zealot');
  })
  it(`zealot should defeat zerg`, () => {
    const patternCraft = new PatternCraft();

    const units = patternCraft.takeTurn(
      [new Zealot(), new Zergling()]);

    expect(units[0].name).toBe('zealot');
    expect(units[0].health).toBeGreaterThan(0);
    expect(units[1].name).toBe('zergling');
    expect(units[1].health).toBeLessThanOrEqual(0);
  })
  // })
})

describe('Battle on flatland', () => {
  it('battle knows 1 marine beats 1 zergling', () => {
    let marine = new Marine();
    let zergling = new Zergling();
    const battle = new Battle([marine, zergling]);

    [marine, zergling] = battle.doBattle();

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeGreaterThan(0);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
  it('battle knows 1 marine beats 1 zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();
    const battle = new Battle([marine, zealot]);

    [marine, zealot] = battle.doBattle();

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeLessThanOrEqual(0);
    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeGreaterThan(0);
  })
  it('battle knows 1 zealot beats 1 zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();
    const battle = new Battle([zealot, zergling]);

    [zealot, zergling] = battle.doBattle();

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
        const battle = new Battle([hero, enemy]);

        [hero, enemy] = battle.doBattle('wall');

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
        const battle = new Battle([hero, enemy]);

        [hero, enemy] = battle.doBattle('hill');

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
        const battle = new Battle([hero, enemy]);

        [hero, enemy] = battle.doBattle('flatland');

        expect(hero.health).toEqual(heroHealth);
        expect(enemy.health).toEqual(enemyHealth);
      })
    })
  })
});

describe('Terrain', () => {
  describe('wall', () => {
    it('marine should kill zealot when only marine has vision of zealot due to wall', () => {
      let marine = new Marine();
      let zealot = new Zealot();

      [marine, zealot] = Terrain([marine, zealot], 'wall');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeLessThanOrEqual(0);
    })
    it('marine should kill zergling when only marine has vision of zergling due to wall', () => {
      let marine = new Marine();
      let zergling = new Zergling();

      [marine, zergling] = Terrain([marine, zergling], 'wall');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zergling.name).toEqual('zergling');
      expect(zergling.health).toBeLessThanOrEqual(0);
    })
  })
  describe('hill', () => {
    it('one marine should kill zealot when zealot is slowed due to hill then only one marine remaining', () => {
      let marineOne = new Marine();
      let zealot = new Zealot();

      [marineOne, zealot] = Terrain([marineOne, zealot], 'hill');

      expect(marineOne.name).toEqual('marine');
      expect(marineOne.health).toBeLessThanOrEqual(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBe(1);
    })
    it('marine should kill one zergling when one zergling is slowed due to hill then only one zergling remaining', () => {
      let marine = new Marine();
      let zergling = new Zergling();

      [marine, zergling] = Terrain([marine, zergling], 'hill');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBe(2);
      expect(zergling.name).toEqual('zergling');
      expect(zergling.health).toBeLessThanOrEqual(0);
    })
  })
  describe('flatland', () => {
    it('one zealot should kill one marine', () => {
      let marine = new Marine();
      let zealot = new Zealot();

      [marine, zealot] = Terrain([marine, zealot], 'flatland');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeLessThanOrEqual(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeGreaterThan(0);
    })
    it('one marine should kill one zergling', () => {
      let marine = new Marine();
      let zergling = new Zergling();

      [marine, zergling] = Terrain([marine, zergling], 'flatland');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zergling.name).toEqual('zergling');
      expect(zergling.health).toBeLessThanOrEqual(0);
    })
  })
})

describe('TerrainModifiers', () => {
  it('wall modifier determines damage between zergling and marine', () => {
    const terrainModifier = new TerrainModifier('wall');
    let marine = new Marine();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([marine, zergling]);

    expect(heroModifier).toEqual(-1)
    expect(enemyModifier).toEqual(3)
  })
  it('wall modifier determines damage between marine and zealot', () => {
    const terrainModifier = new TerrainModifier('wall');
    let marine = new Marine();
    let zealot = new Zealot();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([marine, zealot]);

    expect(heroModifier).toEqual(-1)
    expect(enemyModifier).toEqual(3)
  })
  it('wall modifier determines damage between zealot and zergling', () => {
    const terrainModifier = new TerrainModifier('wall');
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([zealot, zergling]);

    expect(heroModifier).toEqual(3)
    expect(enemyModifier).toEqual(3)
  })
  it('hill modifier determines damage between zergling and marine', () => {
    const terrainModifier = new TerrainModifier('hill');
    let marine = new Marine();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([marine, zergling]);

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(1)
  })
  it('hill modifier determines damage between marine and zealot', () => {
    const terrainModifier = new TerrainModifier('hill');
    let marine = new Marine();
    let zealot = new Zealot();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([marine, zealot]);

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(0)
  })
  it('hill modifier determines damage between zealot and zergling', () => {
    const terrainModifier = new TerrainModifier('hill');
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [heroModifier, enemyModifier] = terrainModifier.terrainModifiers([zealot, zergling]);

    expect(heroModifier).toEqual(0)
    expect(enemyModifier).toEqual(0)
  })
})
