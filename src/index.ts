
export class PatternCraft {
  takeTurn(units: Unit[]) {
    // zealot vs 1 zergling
    if (units.some(unit => unit.name === 'zealot') &&
        units.some(unit => unit.name === 'zergling')) {
      const terrain = new Terrain(units);
      return terrain.flatland();
    }
    // zealot vs marine
    if (units.some(unit => unit.name === 'zealot') &&
        units.some(unit => unit.name === 'marine')) {
      const terrain = new Terrain(units);
      return terrain.flatland();
    }
    // marine vs zergling
    if (units.some(unit => unit.name === 'marine') &&
      units.some(unit => unit.name === 'zergling')) {
      const terrain = new Terrain(units);
      return terrain.flatland();
    }

    const defaultTerrain = new Terrain(units);
    return defaultTerrain.flatland();
  }
}

export class Terrain {
  constructor(public units: Unit[]) {
  }

  wall() {
    if(this.units.some(unit => unit.name === 'marine') &&
       this.units.some(unit => unit.name === 'zealot')
    ) {
      const zealot = this.units.find(unit => unit.name === 'zealot');
      if (zealot !== undefined) {
        zealot.health = 0;
      }
      return this.units;
    }
    if(this.units.some(unit => unit.name === 'marine') &&
       this.units.some(unit => unit.name === 'zergling')
    ) {
      const zergling = this.units.find(unit => unit.name === 'zergling');
      if (zergling !== undefined) {
        zergling.health = 0;
      }
      return this.units;
    }

    return this.units;
  }

  hill() {
    if(this.units.some(unit => unit.name === 'marine') &&
      this.units.some(unit => unit.name === 'zealot')
    ) {
      const zealot = this.units.find(unit => unit.name === 'zealot');
      if (zealot !== undefined) {
        zealot.health = 0;
      }
      const marine = this.units.find(unit => unit.name === 'marine');
      if (marine !== undefined) {
        marine.health = 0;
      }
      return this.units;
    }
    if(this.units.some(unit => unit.name === 'marine') &&
      this.units.some(unit => unit.name === 'zergling')
    ) {
      const marine = this.units.find(unit => unit.name === 'marine');
      if (marine !== undefined) {
        marine.health = 0;
      }
      const zergling = this.units.find(unit => unit.name === 'zergling');
      if (zergling !== undefined) {
        zergling.health = 0;
      }
      return this.units;
    }

    return this.units;
  }
  flatland() {
    // 1 marine 1 zergling
    if (this.units.some(unit => unit.name === 'marine') &&
        this.units.some(unit => unit.name === 'zergling')
    ) {
      const zergling = this.units.find(unit => unit.name === 'zergling');
      if (zergling !== undefined) {
        zergling.health = 0;
      }
      return this.units;
    }
    // 1 marine 1 zealot
    if (this.units.some(unit => unit.name === 'marine') &&
        this.units.some(unit => unit.name === 'zealot')
    ) {
      const marine = this.units.find(unit => unit.name === 'marine');
      if (marine !== undefined) {
        marine.health = 0;
      }
      return this.units;
    }
    // 1 zealot 1 zergling
    if (this.units.some(unit => unit.name === 'zealot') &&
        this.units.some(unit => unit.name === 'zergling')
    ) {
      const zergling = this.units.find(unit => unit.name === 'zergling');
      if (zergling !== undefined) {
        zergling.health = 0;
      }
      return this.units;
    }

    return this.units;
  }
}

export class Unit {
  health: number | undefined;
  name: string | undefined;

  attack(unit: Unit) {
    unit.health = 0;
    return [this, unit] as Unit[];
  }
}

export class Marine extends Unit {
  constructor() {
    super();
    this.health = 2;
    this.name = 'marine'
  }
}
export class Zergling extends Unit {
  constructor() {
    super();
    this.health = 1;
    this.name = 'zergling'
  }
}

export class Zealot extends Unit {
  constructor() {
    super();
    this.health = 3;
    this.name = 'zealot'
  }
}
