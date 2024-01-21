import { Renderer } from "@ui/renderer";
import { Level, LevelId } from "../types";
import { InputsManager } from "@inputs/inputs-manager";
import { SpellManager } from "src/spells";
import { WakeUpScreen } from "./screens/wake-up";
import { ScreenId } from "./screens/types";
import { LearningControlsScreen } from "./screens/learning-controls";
import { clearAllText } from "@ui/text";
import { NewSpellLearned } from "./screens/new-spell-learned";

export class FirstLightLevel implements Level {
  public readonly id: LevelId = LevelId.FirstLight;

  private spellManager: SpellManager;

  private currentScreen: Level<ScreenId>;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer,
    private inputsManager: InputsManager
  ) {
    this.spellManager = new SpellManager(inputsManager);
    this.currentScreen = new WakeUpScreen(
      this.ctx,
      this.renderer,
      this.inputsManager
    );
  }

  init() {
    this.renderer.getCamera().centerCamera([0, 7, 0]);
    this.nextScreen();
    this.nextScreen();
  }

  logic(deltaTInMs: number) {
    if (this.currentScreen.isDone()) {
      this.nextScreen();
    }

    this.currentScreen.logic(deltaTInMs);
  }

  render() {
    this.currentScreen.render();
  }

  isDone() {
    return false;
  }

  private nextScreen() {
    clearAllText();

    switch (this.currentScreen.id) {
      case ScreenId.WakeUp: {
        this.currentScreen = new LearningControlsScreen(
          this.ctx,
          this.renderer,
          this.inputsManager,
          this.spellManager
        );
        this.currentScreen.init();

        break;
      }

      case ScreenId.LearningControls: {
        this.currentScreen = new NewSpellLearned(
          this.ctx,
          this.renderer,
          this.inputsManager
        );
        this.currentScreen.init();

        break;
      }
    }
  }
}
