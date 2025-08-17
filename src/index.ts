export class PatternCraft {
  takeTurn(units: Unit[], terrainType: string = 'flatland') {
    const terrain = new Terrain(units);
    if (terrainType === 'flatland') {
      return terrain.flatland();
    }
    if (terrainType === 'wall') {
      return terrain.wall();
    }
    if (terrainType === 'hill') {
      return terrain.hill();
    }
    return terrain.flatland();
  }
}

export class Terrain {
  constructor(public units: Unit[]) {
  }

  wall() {
    let heroNames = this.units[0].name;
    let enemyNames = this.units[this.units.length - 1].name;
    const heroes = this.units.filter(unit => unit.name === heroNames);
    const enemies = this.units.filter(unit => unit.name === enemyNames);

    heroes.forEach(hero => {
      enemies.forEach(enemy => {
        if (hero?.health || 0 > 0 && enemy?.health || 0 > 0) {
          const battle = new Battle([hero, enemy]);
          const [zealotAfterBattle, zerglingAfterBattle] = battle.doBattle('wall');
          hero = zealotAfterBattle;
          enemy = zerglingAfterBattle;
        }
      })
    })

    return this.units;
  }

  hill() {
    let heroNames = this.units[0].name;
    let enemyNames = this.units[this.units.length - 1].name;
    const heroes = this.units.filter(unit => unit.name === heroNames);
    const enemies = this.units.filter(unit => unit.name === enemyNames);

    heroes.forEach(hero => {
      enemies.forEach(enemy => {
        if (hero?.health || 0 > 0 && enemy?.health || 0 > 0) {
          const battle = new Battle([hero, enemy]);
          const [zealotAfterBattle, zerglingAfterBattle] = battle.doBattle('hill');
          hero = zealotAfterBattle;
          enemy = zerglingAfterBattle;
        }
      })
    })

    return this.units;
  }

  flatland() {
    let heroNames = this.units[0].name;
    let enemyNames = this.units[this.units.length - 1].name;
    const heroes = this.units.filter(unit => unit.name === heroNames);
    const enemies = this.units.filter(unit => unit.name === enemyNames);

    heroes.forEach(hero => {
      enemies.forEach(enemy => {
        const battle = new Battle([hero, enemy]);
        const [zealotAfterBattle, zerglingAfterBattle] = battle.doBattle('flatland');
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

  doBattle(terrainModifier: string = 'flatland') {
    const hero = this.units[0];
    const enemy = this.units[1];
    if (hero === undefined) {
      throw new Error('should never happen, the marine is undefined');
    }
    if (enemy === undefined) {
      throw new Error('should never happen, the zergling is undefined');
    }

    const modifier = new TerrainModifier(terrainModifier);
    modifier.determineDamage([hero, enemy]);

    return this.units;
  }
}

// TODO: this is not connected to the main program
export class TerrainModifier {
  public modifier: string;

  constructor(modifier: string) {
    this.modifier = modifier;

  }

  determineDamage([hero, enemy]: [Unit, Unit]): [Unit, Unit] {
    if (hero.health === undefined) {
      return [hero, enemy]
    }
    if (enemy.health === undefined) {
      return [hero, enemy]
    }
    if (this.modifier === 'wall') {
      if (hero.name === 'marine') {
        if (enemy.name === 'zergling' || enemy.name === 'zealot') {
          // hero.health = hero.health;
          enemy.health = 0;
          return [hero, enemy];
        }
      } else {
        return [hero, enemy]
      }
    }
    if (this.modifier === 'hill') {
      if (hero.name === 'marine') {
        if (enemy.name === 'zergling') {
          // hero.health = hero.health;
          enemy.health = 0;
          return [hero, enemy];
        }
        if (enemy.name === 'zealot') {
          hero.health -= hero.health;
          enemy.health = enemy.health - 2;
          return [hero, enemy];
        }
      } else {
        hero.health -= 1;
        enemy.health -= 1;
        return [hero, enemy]
      }
    }
    if (this.modifier === 'flatland') {
      if (hero.name === 'marine') {
        const damage = enemy.name === 'zealot' ? 2 : 0
        hero.health = hero?.health - damage;
      }
      if (hero.name === 'zealot') {
        const damage = enemy.name === 'marine' ? 2 : 1
        hero.health = hero?.health - damage;
      }
      if (enemy.name === 'zergling') {
        enemy.health = 0;
      }
      if (enemy.name === 'zealot') {
        enemy.health = 1;
      }
      if (enemy.name === 'zergling') {
        enemy.health = 0;
      }
    }
    return [hero, enemy]
  }
}
