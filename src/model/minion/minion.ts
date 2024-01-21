import { Position, Size } from "@model/types";
import { Wizard } from "@model/wizard";
import { LightMagicWord } from "@spells";

export class Minion {
  direction: [number, number] = [-1, 1];

  speed: number = 0.5;

  totalHp: number = 5;

  hp: number = this.totalHp;

  hit: boolean = false;

  constructor(public pos: Position, public size: Size) {}

  isDead() {
    return this.hp <= 0;
  }
}

interface MinionEnvironment {
  wizard: Wizard;
  deltaTInMs: number;
}

export function minionLogic(
  minion: Minion,
  { wizard, deltaTInMs }: MinionEnvironment
) {
  minion.pos = gotTo(
    wizard.pos,
    minion.pos,
    (minion.speed * deltaTInMs) / 1000
  );

  const [x1, y1, z1] = wizard.pos;
  const [x2, y2, z2] = minion.pos;

  const [p1, p2, p3] = [x1 - x2, y1 - y2, z1 - z2];
  const hyp = Math.sqrt(p2 * p2 + p1 * p1);

  const angle = Math.asin(p2 / hyp);

  if (
    angle > wizard.aimAngle - wizard.aimAngleRange &&
    angle < wizard.aimAngle + wizard.aimAngleRange &&
    wizard.currentSpell &&
    wizard.currentSpell.magicWord == LightMagicWord
  ) {
    minion.hit = true;
    minion.hp -= (2 * deltaTInMs) / 1000;
  } else {
    minion.hit = false;
  }
}

export function makeMinion(pos: Position, size: Size) {
  return new Minion([...pos], size);
}

function gotTo(
  [x1, y1, z1]: Position,
  [x2, y2, z2]: Position,
  speed: number
): Position {
  const [p1, p2, p3] = [x1 - x2, y1 - y2, z1 - z2];

  const max = Math.max(Math.abs(p1), Math.abs(p2), Math.abs(p3));

  const normed = [p1 / max, p2 / max, p3 / max];

  return [
    x2 + speed * normed[0],
    y2 + speed * normed[1],
    z2 + speed * normed[2],
  ];
}
