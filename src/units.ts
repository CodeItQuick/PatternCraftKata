export class Unit {
  health: number = 0;
  name: string | undefined;
  damage: number = 0;
  canAttack: boolean = false;

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
    this.canAttack = true;
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
