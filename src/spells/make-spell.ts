import { Light } from "./light";
import { MagicWord } from "./spells";

export function makeSpell(magicWord: MagicWord) {
  switch (magicWord) {
    case "L":
      return new Light();
      break;
  }
}
