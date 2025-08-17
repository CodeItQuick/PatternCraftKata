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

      expect(marineAfterBattle.health).toEqual(2);
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

describe('Units', () => {
  it('marine should be able to attack zergling', () => {
    let marine = new Marine();
    let zergling = new Zergling();

    [marine, zergling] = marine.attack(zergling);

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeGreaterThan(0);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
  it('zealot should be able to attack marine', () => {
    let zealot = new Zealot();
    let marine = new Marine();

    [zealot, marine] = zealot.attack(marine);

    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeGreaterThan(0);
    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeLessThanOrEqual(0);
  })
  it('zealot should be able to attack zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();

    [zealot, zergling] = zealot.attack(zergling);

    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeGreaterThan(0);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
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

describe('Battle through wall', () => {
  it('battle knows 1 marine beats 1 zergling', () => {
    let marine = new Marine();
    let zergling = new Zergling();
    const battle = new Battle([marine, zergling]);

    [marine, zergling] = battle.doBattle('wall');

    expect(marine.name).toEqual('marine');
    expect(marine.health).toEqual(2);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
  it('battle knows 1 marine beats 1 zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();
    const battle = new Battle([marine, zealot]);

    [marine, zealot] = battle.doBattle('wall');

    expect(marine.name).toEqual('marine');
    expect(marine.health).toEqual(2);
    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toBeLessThanOrEqual(0);
  })
  it('battle knows 1 zealot does not damage 1 zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();
    const battle = new Battle([zealot, zergling]);

    [zealot, zergling] = battle.doBattle('wall');

    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toEqual(3);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(1);
  })
})

describe('Battle through hill', () => {
  it('battle knows 1 marine beats 1 zergling', () => {
    let marine = new Marine();
    let zergling = new Zergling();
    const battle = new Battle([marine, zergling]);

    [marine, zergling] = battle.doBattle('hill');

    expect(marine.name).toEqual('marine');
    expect(marine.health).toEqual(2);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
  it('battle knows 1 marine beats 1 zealot', () => {
    let marine = new Marine();
    let zealot = new Zealot();
    const battle = new Battle([marine, zealot]);

    [marine, zealot] = battle.doBattle('hill');

    expect(marine.name).toEqual('marine');
    expect(marine.health).toBeLessThanOrEqual(0);
    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toEqual(1);
  })
  it('battle knows 1 zealot beats 1 zergling', () => {
    let zealot = new Zealot();
    let zergling = new Zergling();
    const battle = new Battle([zealot, zergling]);

    [zealot, zergling] = battle.doBattle('hill');

    expect(zealot.name).toEqual('zealot');
    expect(zealot.health).toEqual(2);
    expect(zergling.name).toEqual('zergling');
    expect(zergling.health).toBeLessThanOrEqual(0);
  })
})

describe('Terrain', () => {
  describe('wall', () => {
    it('marine should kill zealot when only marine has vision of zealot due to wall', () => {
      let marine = new Marine();
      let zealot = new Zealot();
      let terrain = new Terrain([marine, zealot]);

      [marine, zealot] = terrain.fight('wall');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeLessThanOrEqual(0);
    })
    it('marine should kill zergling when only marine has vision of zergling due to wall', () => {
      let marine = new Marine();
      let zergling = new Zergling();
      let terrain = new Terrain([marine, zergling]);

      [marine, zergling] = terrain.fight('wall');

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
      let terrain = new Terrain([marineOne, zealot]);

      [marineOne, zealot] = terrain.fight('hill');

      expect(marineOne.name).toEqual('marine');
      expect(marineOne.health).toBeLessThanOrEqual(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBe(1);
    })
    it('marine should kill one zergling when one zergling is slowed due to hill then only one zergling remaining', () => {
      let marine = new Marine();
      let zergling = new Zergling();
      let terrain = new Terrain([marine, zergling]);

      [marine, zergling] = terrain.fight('hill');

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
      let terrain = new Terrain([marine, zealot]);

      [marine, zealot] = terrain.fight('flatland');

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeLessThanOrEqual(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeGreaterThan(0);
    })
    it('one marine should kill one zergling', () => {
      let marine = new Marine();
      let zergling = new Zergling();
      let terrain = new Terrain([marine, zergling]);

      [marine, zergling] = terrain.fight('flatland');

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

    const [marineAfterBattle, zerglingAfterBattle] = terrainModifier.determineDamage([marine, zergling]);

    expect(marineAfterBattle.health).toEqual(2)
    expect(zerglingAfterBattle.health).toEqual(0)
  })
  it('wall modifier determines damage between marine and zealot', () => {
    const terrainModifier = new TerrainModifier('wall');
    let marine = new Marine();
    let zealot = new Zealot();

    const [marineAfterBattle, zealotAfterBattle] = terrainModifier.determineDamage([marine, zealot]);

    expect(marineAfterBattle.health).toEqual(2)
    expect(zealotAfterBattle.health).toEqual(0)
  })
  it('wall modifier determines damage between zealot and zergling', () => {
    const terrainModifier = new TerrainModifier('wall');
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [zealotAfterBattle, zerglingAfterBattle] = terrainModifier.determineDamage([zealot, zergling]);

    expect(zealotAfterBattle.health).toEqual(3)
    expect(zerglingAfterBattle.health).toEqual(1)
  })
  it('hill modifier determines damage between zergling and marine', () => {
    const terrainModifier = new TerrainModifier('hill');
    let marine = new Marine();
    let zergling = new Zergling();

    const [marineAfterBattle, zerglingAfterBattle] = terrainModifier.determineDamage([marine, zergling]);

    expect(marineAfterBattle.health).toEqual(2)
    expect(zerglingAfterBattle.health).toEqual(0)
  })
  it('hill modifier determines damage between marine and zealot', () => {
    const terrainModifier = new TerrainModifier('hill');
    let marine = new Marine();
    let zealot = new Zealot();

    const [marineAfterBattle, zealotAfterBattle] = terrainModifier.determineDamage([marine, zealot]);

    expect(marineAfterBattle.health).toEqual(0)
    expect(zealotAfterBattle.health).toEqual(1)
  })
  it('hill modifier determines damage between zealot and zergling', () => {
    const terrainModifier = new TerrainModifier('hill');
    let zealot = new Zealot();
    let zergling = new Zergling();

    const [zealotAfterBattle, zerglingAfterBattle] = terrainModifier.determineDamage([zealot, zergling]);

    expect(zealotAfterBattle.health).toEqual(2)
    expect(zerglingAfterBattle.health).toEqual(0)
  })
  // it('flatland modifier determines damage between zergling and marine', () => {
  // })
  // it('flatland modifier determines damage between marine and zealot', () => {
  // })
  // it('flatland modifier determines damage between zealot and zergling', () => {
  // })
})
