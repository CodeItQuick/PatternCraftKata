import {Marine, PatternCraft, Terrain, Zealot, Zergling} from "../../src";

describe('Pattern Craft', () => {
  // let theory = [
  //   { something: 'something' }
  // ]
  // theory.forEach(x => {
    it(`marine should defeat zerg when one marine fight one zergling`, () => {
      const patternCraft = new PatternCraft();

      const units = patternCraft.takeTurn(
        [new Marine(), new Zergling()]);

      expect(units[0].health).toBeGreaterThan(0);
      expect(units[0].name).toBe('marine');
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

describe('Terrain', () => {
  describe('wall', () => {
    it('marine should kill zealot when only marine has vision of zealot due to wall', () => {
      let marine = new Marine();
      let zealot = new Zealot();
      let terrain = new Terrain([marine, zealot]);

      [marine, zealot] = terrain.wall();

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeLessThanOrEqual(0);
    })
    it('marine should kill zergling when only marine has vision of zergling due to wall', () => {
      let marine = new Marine();
      let zergling = new Zergling();
      let terrain = new Terrain([marine, zergling]);

      [marine, zergling] = terrain.wall();

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zergling.name).toEqual('zergling');
      expect(zergling.health).toBeLessThanOrEqual(0);
    })
  })
  describe('hill', () => {
    it('two marines should kill zealot when zealot is slowed due to hill then only one marine remaining', () => {
      let marineOne = new Marine();
      let marineTwo = new Marine();
      let zealot = new Zealot();
      let terrain = new Terrain([marineOne, marineTwo, zealot]);

      [marineOne, marineTwo, zealot] = terrain.hill();

      expect(marineOne.name).toEqual('marine');
      expect(marineOne.health).toBeLessThanOrEqual(0);
      expect(marineTwo.name).toEqual('marine');
      expect(marineTwo.health).toBeGreaterThan(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeLessThanOrEqual(0);
    })
    it('marine should kill two zergling when two zergling is slowed due to hill then only one zergling remaining', () => {
      let marine = new Marine();
      let zerglingOne = new Zergling();
      let zerglingTwo = new Zergling();
      let terrain = new Terrain([marine, zerglingOne, zerglingTwo]);

      [marine, zerglingOne] = terrain.hill();

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeLessThanOrEqual(0);
      expect(zerglingOne.name).toEqual('zergling');
      expect(zerglingOne.health).toBeLessThanOrEqual(0);
      expect(zerglingTwo.name).toEqual('zergling');
      expect(zerglingTwo.health).toBeGreaterThan(0);
    })
  })
  describe('flatland', () => {
    it('one marines should kill zealot when zealot is slowed due to hill then only one marine remaining', () => {
      let marine = new Marine();
      let zealot = new Zealot();
      let terrain = new Terrain([marine, zealot]);

      [marine, zealot] = terrain.flatland();

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeLessThanOrEqual(0);
      expect(zealot.name).toEqual('zealot');
      expect(zealot.health).toBeGreaterThan(0);
    })
    it('one marine should kill one zergling when one zergling is slowed due to flatLand then only one zergling remaining', () => {
      let marine = new Marine();
      let zergling = new Zergling();
      let terrain = new Terrain([marine, zergling]);

      [marine, zergling] = terrain.flatland();

      expect(marine.name).toEqual('marine');
      expect(marine.health).toBeGreaterThan(0);
      expect(zergling.name).toEqual('zergling');
      expect(zergling.health).toBeLessThanOrEqual(0);
    })
  })
})
