import { Light, SpellManager } from "src/spells";
import { Position } from "../types";
import { MagicWord, Spell } from "@spells/spells";
import { makeSpell } from "@spells/make-spell";

export class Wizard {
  public pos: Position;
  /**
   * Meters
   */
  public size: number;

  public aimAngle: number = Math.PI / 2;

  public currentSpell: Spell | null = null;

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

export function wizardLogic(
  wizard: Wizard,
  spellManager: SpellManager,
  deltaTInMs: number
) {
  // Read spells
  const magicWord: MagicWord | null = spellManager.getCurrentMagicWord();

  if (magicWord) {
    wizard.currentSpell = makeSpell(magicWord);
  }

  wizard.currentSpell?.tick(deltaTInMs);

  if (wizard.currentSpell?.isOver()) {
    wizard.currentSpell = null;
  }
}
