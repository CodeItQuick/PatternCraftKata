

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
    const [heroTerrainModifier, enemyTerrainModifier] = modifier.terrainModifiers([hero, enemy]);

    return [hero.takeDamage(enemy, enemyTerrainModifier),
      enemy.takeDamage(hero, heroTerrainModifier)];
  }
}

export class TerrainModifier {
  public modifier: string;

  constructor(modifier: string) {
    this.modifier = modifier;

  }

  terrainModifiers([hero, enemy]: [Unit, Unit]): [number, number] {
    let heroTerrainModifier = 0;
    let enemyTerrainModifier = 0;
    if (this.modifier === 'wall') {
      if (enemy.name === 'zergling' || enemy.name === 'zealot') {
        enemyTerrainModifier = 3;
      } else {
        enemyTerrainModifier = -1;
      }
      if (hero.name === 'zergling' || hero.name === 'zealot') {
        heroTerrainModifier = 3;
      } else {
        heroTerrainModifier = -1;
      }
    }
    if (this.modifier === 'hill') {
      if (hero.name === 'marine' && enemy.name === 'zergling') {
        enemyTerrainModifier = 1;
      } else if (hero.name === 'zergling' && enemy.name === 'marine') {
        heroTerrainModifier = 1;
      }
    }

    return [heroTerrainModifier, enemyTerrainModifier]
  }
}

export class Unit {
  health: number = 0;
  name: string | undefined;
  damage: number = 0;

  takeDamage(enemy: Unit, terrainModifier: number) {
    let enemyDamage = enemy.damage - terrainModifier
    if (enemyDamage <= 0) {
      enemyDamage = 0;
    }
    this.health = this.health - enemyDamage;
    if (this.health < 0) {
      this.health = 0;
    }
    return this;
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

