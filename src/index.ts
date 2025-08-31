import {Unit} from "./units";

export const PatternCraft =
  (units: Unit[], terrainType: string = 'flatland') => {
  const heroRace = units[0].name
  const enemyRace = units[units.length - 1].name
  const heroes = units.filter(unit => unit.name === heroRace)
  const enemies = units.filter(unit => unit.name === enemyRace)

  return War(heroes, enemies, terrainType);
}

export const War =
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

    const battleStartsSecondTurn = hero.attackType === 'melee' && enemy.attackType === 'melee';
    if (battleStartsSecondTurn) {
      [hero, enemy] = Turn(hero, enemy, terrainModifier) as [Unit, Unit];
    }
    let attacking = false;
    let validBattle = false;
    do {
      let [{ canAttack: heroCanAttack, health: heroHealth }, { canAttack: enemyCanAttack, health: enemyHealth }] =
        Turn(hero, enemy, terrainModifier) as [Unit, Unit];

      attacking = heroCanAttack || enemyCanAttack;
      validBattle = heroHealth > 0 && enemyHealth > 0;
    } while (attacking && validBattle)

    return [hero, enemy] as [Unit, Unit]
}

export const TerrainModifier =
  ([hero, enemy]: [Unit, Unit], modifier: string): [number, number] => {
    let heroTerrainModifier = 0;
    let enemyTerrainModifier = 0;
    if (modifier === 'wall') {
      if (enemy.name === 'zergling' || enemy.name === 'zealot') {
        enemyTerrainModifier = 3;
      } else if (enemy.name === 'marine') {
        enemyTerrainModifier = -1;
      }
      if (hero.name === 'zergling' || hero.name === 'zealot') {
        heroTerrainModifier = 3;
      } else if (hero.name === 'marine') {
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

// determines who can attack who, and makes them attack each other if possible
export const Turn = (hero: Unit, enemy: Unit, terrain = 'flatland'): [Unit, Unit] => {
  // if allowed, enemy and hero do damage to each other
  const [heroTerrain, enemyTerrain] = TerrainModifier([hero, enemy], terrain);
  if (hero.canAttack) {
    enemy.takeTurnDamage(heroTerrain);
  }
  if (enemy.canAttack) {
    hero.takeTurnDamage(enemyTerrain);
  }

  if (terrain === 'wall') {
    if (hero.health > 0 &&
      hero.attackType === 'melee') {
      hero.canAttack = false;
    }
    if (enemy.health > 0 &&
      enemy.attackType === 'melee') {
      enemy.canAttack = false;
    }
  }
  // if hero and enemy are alive, they can now attack each other
  if (terrain !== 'wall' && hero.health > 0 && enemy.health > 0) {
    hero.canAttack = true;
    enemy.canAttack = true;
  } else if (terrain !== 'wall') {
    // otherwise, one of them is dead and reset melee's attack modifier
    if (hero.attackType === 'melee') {
      hero.canAttack = false;
    }
    if (enemy.attackType === 'melee') {
      enemy.canAttack = false;
    }
  }
  return [hero, enemy]
}
