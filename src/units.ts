export class Unit {
  health: number = 0;
  name: string | undefined;
  damage: number = 0;
  canAttack: boolean = false;
  attackType: 'melee' | 'range' = 'melee';

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
  takeTurnDamage(terrainModifier: number) {
    let enemyDamage = 1 - terrainModifier
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
    this.health = 4;
    this.damage = 3;
    this.name = 'zealot';
  }
}

export class Marine extends Unit {
  constructor() {
    super();
    this.health = 2;
    this.damage = 3;
    this.canAttack = true;
    this.name = 'marine';
    this.attackType = 'range';
  }
}

export class Zergling extends Unit {
  constructor() {
    super();
    this.health = 2;
    this.damage = 1;
    this.name = 'zergling'
  }
}
