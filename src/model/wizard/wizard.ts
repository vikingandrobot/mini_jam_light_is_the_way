import { Position } from "../types";

export interface Wizard {
  pos: Position;
  /**
   * Meters
   */
  size: number;
}

export interface MakeWizardOptions {
  pos: Position;
  size: number;
}

export function makeWizard({ pos, size }: MakeWizardOptions): Wizard {
  return {
    pos: [...pos],
    size,
  };
}
