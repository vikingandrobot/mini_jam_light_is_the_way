import { Level } from "@game/levels/types";
import { ScreenId } from "./types";
import { Renderer } from "@ui/renderer";
import { Input, InputsManager } from "@inputs";
import { writeBottomInstructionText, writeStoryText } from "@ui/text";

const STORY_TEXT =
  "Wake up, ancient mage... In those times of Darkness, do you still remember how to serve the Light?";

const INSTRUCTION_TEST = "Press [SPACE] to continue";

export class WakeUpScreen implements Level<ScreenId> {
  id = ScreenId.WakeUp;

  private continue: boolean = false;

  private textIndex = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer,
    private inputsManager: InputsManager
  ) {}

  init() {}

  isDone(): boolean {
    return this.continue;
  }

  logic(_deltaTInMs: number): void {
    if (this.textIndex < STORY_TEXT.length) {
      this.textIndex += 0.4;
    }

    if (
      this.textIndex >= STORY_TEXT.length &&
      this.inputsManager.isInputEnabled(Input.Space)
    ) {
      this.continue = true;
    }
  }

  render(): void {
    const index = Math.round(this.textIndex);
    const textToDisplay = STORY_TEXT.slice(0, index);

    writeStoryText(textToDisplay);

    if (index >= STORY_TEXT.length) {
      writeBottomInstructionText(INSTRUCTION_TEST);
    }
  }
}
