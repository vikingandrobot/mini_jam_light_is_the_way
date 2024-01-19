import { Camera } from "@camera";
import { HomeScreen } from "./home-screen";
import { Renderer } from "@ui/renderer";
import { draw as drawWizard } from "@ui/wizard";
import { Size } from "@model";
import { InputsManager } from "@inputs/inputs-manager";
import { Level, LevelId } from "./levels/types";
import { FirstLightLevel } from "./levels/first-light.ts";

const DELTA_T = 0.04; // 1/25 second
const DELTA_T_IN_MS = 40;

export class Game {
  private canvasNewSize: Size | null = null;
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  private renderer: Renderer;
  private homeScreen: HomeScreen;
  private inputsManager: InputsManager = new InputsManager();

  private levels: Partial<Record<LevelId, Level>> = {};
  private currentLevel: Level | null = null;

  constructor(private canvas: HTMLCanvasElement) {
    this.camera = new Camera({
      pos: [0, 0, 0],
      size: [20, 10],
      viewportWidth: 600,
      canvas: this.canvas,
      xRotation: (6 * Math.PI) / 4,
    });

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.camera);

    this.homeScreen = new HomeScreen(
      this.ctx,
      this.renderer,
      this.inputsManager
    );
    this.homeScreen.init();

    this.createLevels();
  }

  tick() {
    if (this.canvasNewSize) {
      this.camera.setViewportWidth(this.canvasNewSize[0]);
      this.canvasNewSize = null;
    }
    if (this.isCurrentLevelDone()) {
      this.goToNextLevel();
      return;
    }

    if (this.currentLevel) {
      this.currentLevel.logic();
    } else {
      this.homeScreen.logic();
    }

    this.render();
  }

  render() {
    this.ctx.clearRect(
      0,
      0,
      this.camera.viewportSize[0],
      this.camera.viewportSize[1]
    );

    if (this.currentLevel) {
      this.currentLevel.render();
    } else {
      this.homeScreen.render();
    }
  }

  init() {
    window.addEventListener("resize", this.requestCanvasResize, false);

    this.requestCanvasResize();

    this.inputsManager.init();

    setInterval(() => {
      this.tick();
    }, DELTA_T_IN_MS);
  }

  private createLevels() {
    this.levels = {
      [LevelId.FirstLight]: new FirstLightLevel(
        this.ctx,
        this.renderer,
        this.inputsManager
      ),
    };

    // this.currentLevel = this.levels[LevelId.FirstLight] ?? null;
    // this.currentLevel?.init();
  }

  private isCurrentLevelDone(): boolean {
    if (this.currentLevel === null) {
      return this.homeScreen.isDone();
    }

    return this.currentLevel.isDone();
  }

  private goToNextLevel() {
    if (this.currentLevel === null) {
      this.currentLevel = this.levels[LevelId.FirstLight] ?? null;
    }

    this.currentLevel?.init();
  }

  private requestCanvasResize = () => {
    this.canvasNewSize = [window.innerWidth, window.innerHeight];
  };
}
