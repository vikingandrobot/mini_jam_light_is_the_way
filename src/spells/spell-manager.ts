import { Input, InputsManager } from "@inputs/inputs-manager";
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

  private knownPowerWords: Partial<Record<PowerWord, boolean>> = {};

  private powerWordHistory: Record<PowerWord, boolean> = {
    [PowerWord.Light]: false,
    [PowerWord.Shield]: false,
    [PowerWord.Power]: false,
    [PowerWord.Focus]: false,
  } as const;

  constructor(private inputsManager: InputsManager) {}

  collectSpells() {
    /**
     * Read the user inputs
     */
    Object.keys(InputsToPowerWordDict).forEach((keyName) => {
      if (
        !this.knownPowerWords[InputsToPowerWordDict[keyName as PowerWordInputs]]
      ) {
        return;
      }
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

  getCurrentSpellCast(): string {
    return this.currentSpellCast;
  }

  setKnownPowerWords(powerWords: Partial<Record<PowerWord, boolean>>) {
    this.knownPowerWords = powerWords;
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
