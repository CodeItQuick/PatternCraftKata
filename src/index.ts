
export class PatternCraft {
  takeTurn(units: Unit[]) {
    const terrain = new Terrain(units);
    return terrain.flatland();
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
    const heroes = this.units.filter(unit => unit.name === this.units[0].name);
    const enemies = this.units.filter(unit => unit.name === this.units[this.units.length - 1].name);

    heroes.forEach(hero => {
      enemies.forEach(enemy => {
        const battle = new Battle([hero, enemy]);
        const [zealotAfterBattle, zerglingAfterBattle] = battle.doBattle();
        hero = zealotAfterBattle;
        enemy = zerglingAfterBattle;
      })
    })

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

export class Battle {
  constructor(public units: [Unit, Unit]) {
  }

  doBattle() {
    if (this.units.map(x => x.name).includes('marine') &&
      this.units.map(x => x.name).includes('zergling')
    ) {
      const zergling = this.units.find(unit => unit.name === 'zergling');
      if (zergling !== undefined) {
        zergling.health = 0;
      }
      return this.units;
    }
    // 1 marine 1 zealot
    if (this.units.map(x => x.name).includes('marine') &&
      this.units.map(x => x.name).includes('zealot')
    ) {
      const marine = this.units.find(unit => unit.name === 'marine');
      if (marine !== undefined) {
        marine.health = 0;
      }
      return this.units;
    }
    // 1 zealot 1 zergling
    if (this.units.map(x => x.name).includes('zealot') &&
      this.units.map(x => x.name).includes('zergling')
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
