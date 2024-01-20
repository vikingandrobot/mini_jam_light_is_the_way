export enum PowerWord {
  Light = "Light",
  Shield = "Shield",
  Power = "Power",
  Focus = "Focus",
}

export type Rune = "L" | "S" | "P" | "F";

export const PowerWordRunes: Record<PowerWord, Rune> = {
  [PowerWord.Light]: "L",
  [PowerWord.Shield]: "S",
  [PowerWord.Power]: "P",
  [PowerWord.Focus]: "F",
};

export type MagicWord = "L";

export const LightMagicWord: MagicWord = "L";

export const SpellBook: Record<string, MagicWord> = {
  [LightMagicWord]: LightMagicWord,
} as const;

export interface Spell {
  totalDuration: number;
  tick(deltaT: number): void;
  isOver(): boolean;
}
