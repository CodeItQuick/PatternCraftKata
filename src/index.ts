export const PatternCraft =
  (units: Unit[], terrainType: string = 'flatland') => {
  const heroRace = units[0].name
  const enemyRace = units[units.length - 1].name
  const heroes = units.filter(unit => unit.name === heroRace)
  const enemies = units.filter(unit => unit.name === enemyRace)

  return Terrain(heroes, enemies, terrainType);
}

export const Terrain =
  (heroes: Unit[], enemies: Unit[], terrainType: string):
  { heroes: Unit[], enemies: Unit[] } => {
  let heroResults: Unit[] = [], enemyResults: Unit[] = [];
  heroes.forEach(hero => {
    enemies.forEach(enemy => {
      if (hero.health > 0 && enemy.health > 0) {
        const [heroResult, enemyResult] = Battle([hero, enemy], terrainType);
        heroResults.push(heroResult);
        enemyResults.push(enemyResult);
      } else if (hero.health > 0) {
        heroResults.push(hero);
      } else if (enemy.health > 0) {
        enemyResults.push(enemy)
      }
    })
  })
  return { enemies: enemyResults, heroes: heroResults };
}

export const Battle =
  ([hero, enemy]: [Unit, Unit], terrainModifier: string = 'flatland'): [Unit, Unit] => {
    if (hero === undefined) {
      throw new Error(`should never happen, the hero is undefined`);
    }
    if (enemy === undefined) {
      throw new Error('should never happen, the enemy is undefined');
    }

    const [heroTerrainModifier, enemyTerrainModifier] = TerrainModifier([hero, enemy], terrainModifier);

    return [hero.takeDamage(enemy, enemyTerrainModifier),
      enemy.takeDamage(hero, heroTerrainModifier)];
}

export const TerrainModifier =
  ([hero, enemy]: [Unit, Unit], modifier: string): [number, number] => {
    let heroTerrainModifier = 0;
    let enemyTerrainModifier = 0;
    if (modifier === 'wall') {
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
    if (modifier === 'hill') {
      if (hero.name === 'marine' && enemy.name === 'zergling') {
        enemyTerrainModifier = 1;
      } else if (hero.name === 'zergling' && enemy.name === 'marine') {
        heroTerrainModifier = 1;
      }
    }

    return [heroTerrainModifier, enemyTerrainModifier]
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
    if (this.health < 0 || this.health === undefined) {
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

