import { Position } from "../types";

export class Wizard {
  public pos: Position;
  /**
   * Meters
   */
  public size: number;

  public aimAngle: number = Math.PI / 2;

  constructor({ pos, size }: MakeWizardOptions) {
    (this.pos = [...pos]), (this.size = size);
  }

  rotateAim(byAngle: number) {
    this.aimAngle += byAngle;
  }
}

export interface MakeWizardOptions {
  pos: Position;
  size: number;
}

export function makeWizard(options: MakeWizardOptions): Wizard {
  return new Wizard(options);
}
