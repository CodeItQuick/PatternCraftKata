

export class PatternCraft {
  takeTurn(units: Unit[], terrainType: string = 'flatland') {
    const terrain = new Terrain(units);
    return terrain.fight(terrainType);
  }
}

export class Terrain {
  constructor(public units: Unit[]) {
  }

  fight(terrainType: string) {
    let heroNames = this.units[0].name;
    let enemyNames = this.units[this.units.length - 1].name;
    const heroes = this.units.filter(unit => unit.name === heroNames);
    const enemies = this.units.filter(unit => unit.name === enemyNames);

    heroes.forEach(hero => {
      enemies.forEach(enemy => {
        if (hero?.health || 0 > 0 && enemy?.health || 0 > 0) {
          const battle = new Battle([hero, enemy]);
          this.units = battle.doBattle(terrainType);
        }
      })
    })

    return this.units;
  }
}

export class Battle {
  constructor(public units: [Unit, Unit]) {
  }

  doBattle(terrainModifier: string = 'flatland') {
    const hero = this.units[0];
    const enemy = this.units[1];
    if (hero === undefined) {
      throw new Error(`should never happen, the hero is undefined`);
    }
    if (enemy === undefined) {
      throw new Error('should never happen, the enemy is undefined');
    }

    const modifier = new TerrainModifier(terrainModifier);
    modifier.determineDamage([hero, enemy]);

    return this.units;
  }
}

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
      let heroDamage = enemy.health;
      let enemyDamage = hero.health;
      if (enemy.name === 'zergling' || enemy.name === 'zealot') {
        enemyDamage = 0;
      }
      if (hero.name === 'zergling' || hero.name === 'zealot') {
        heroDamage = 0;
      }
      hero.health = hero?.health - enemyDamage;
      enemy.health = enemy.health - heroDamage;

      return [hero, enemy]
    }
    if (this.modifier === 'hill') {
      let heroDamage = hero.damage;
      let enemyDamage = enemy.damage;
      if (hero.name === 'marine' && enemy.name === 'zergling') {
        enemyDamage = enemyDamage - 1;
      } else if (hero.name === 'zergling' && enemy.name === 'marine') {
        heroDamage = heroDamage - 1;
      }
      hero.health = hero?.health - enemyDamage;
      enemy.health = enemy.health - heroDamage;

      return [hero, enemy]
    }
    if (this.modifier === 'flatland') {
      hero.health = hero?.health - enemy.damage;
      enemy.health = enemy.health - hero.damage;
    }
    return [hero, enemy]
  }
}

export class Unit {
  health: number | undefined;
  name: string | undefined;
  damage: number = 0;

  attack(unit: Unit) {
    unit.health = 0;
    return [this, unit] as Unit[];
  }
}

export class Zealot extends Unit {
  constructor() {
    super();
    this.health = 3;
    this.damage = 2;
    this.name = 'zealot';
  }
}

export class Marine extends Unit {
  constructor() {
    super();
    this.health = 2;
    this.damage = 2;
    this.name = 'marine'
  }
}

export class Zergling extends Unit {
  constructor() {
    super();
    this.health = 1;
    this.damage = 1;
    this.name = 'zergling'
  }
}

