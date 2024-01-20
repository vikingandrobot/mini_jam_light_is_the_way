import { Input, InputsManager } from "@inputs";
import { PowerWord, PowerWordRunes, MagicWord, SpellBook } from "./spells";

type PowerWordInputs = Input.KeyA | Input.KeyD | Input.KeyS | Input.KeyW;

const InputsToPowerWordDict: Record<PowerWordInputs, PowerWord> = {
  [Input.KeyW]: PowerWord.Light,
  [Input.KeyD]: PowerWord.Power,
  [Input.KeyS]: PowerWord.Shield,
  [Input.KeyA]: PowerWord.Focus,
};

const MAX_SPELL_LENGTH = 5;

export class SpellManager {
  private currentMagicWord: MagicWord | null = null;
  private currentSpellCast: string = "";

  private powerWordHistory: Record<PowerWord, boolean> = {
    [PowerWord.Light]: false,
    [PowerWord.Shield]: false,
    [PowerWord.Power]: false,
    [PowerWord.Focus]: false,
  } as const;

  private spellBook: Record<MagicWord, boolean> = {
    L: false,
  };

  constructor(private inputsManager: InputsManager) {}

  collectSpells() {
    /**
     * Read the user inputs
     */
    Object.keys(InputsToPowerWordDict).forEach((keyName) => {
      const input = this.inputsManager.isInputEnabled(
        keyName as PowerWordInputs
      );
      this.collectPowerWord(
        InputsToPowerWordDict[keyName as PowerWordInputs],
        input
      );
    });

    /**
     * Detect a spell
     */
    if (SpellBook[this.currentSpellCast]) {
      this.currentMagicWord = SpellBook[this.currentSpellCast];
      this.currentSpellCast = "";
    }

    if (this.currentSpellCast.length > MAX_SPELL_LENGTH) {
      this.currentSpellCast = "";
    }
  }

  getCurrentMagicWord(): MagicWord | null {
    return this.currentMagicWord;
  }

  clearCurrentSpell(): void {
    this.currentMagicWord = null;
  }

  private collectPowerWord(pw: PowerWord, inputEnabled: boolean) {
    if (inputEnabled === false) {
      this.powerWordHistory[pw] = false;
      return;
    }

    if (this.powerWordHistory[pw] !== inputEnabled) {
      this.currentSpellCast = this.currentSpellCast + PowerWordRunes[pw];
      this.powerWordHistory[pw] = true;
    }
  }
}
