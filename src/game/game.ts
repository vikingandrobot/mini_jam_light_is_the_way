import { Camera } from "@camera";
import { HomeScreen } from "./home-screen";
import { Renderer } from "@ui/renderer";
import { draw as drawWizard } from "@ui/wizard";
import { Size } from "@model";
import { InputsManager } from "@inputs/inputs-manager";

const DELTA_T = 0.04; // 1/25 second
const DELTA_T_IN_MS = 40;

export class Game {
  private canvasNewSize: Size | null = null;
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  private homeScreen: HomeScreen;
  private inputsManager: InputsManager = new InputsManager();

  constructor(private canvas: HTMLCanvasElement) {
    this.camera = new Camera({
      pos: [0, 0, 0],
      size: [20, 10],
      viewportWidth: 600,
      canvas: this.canvas,
      xRotation: (6 * Math.PI) / 4,
    });

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const renderer = new Renderer(this.camera);
    this.homeScreen = new HomeScreen(this.ctx, renderer, this.inputsManager);
    this.homeScreen.init();
  }

  tick() {
    if (this.canvasNewSize) {
      this.camera.setViewportWidth(this.canvasNewSize[0]);
      this.canvasNewSize = null;
    }

    this.ctx.clearRect(
      0,
      0,
      this.camera.viewportSize[0],
      this.camera.viewportSize[1]
    );

    if (!this.homeScreen.isDone()) {
      this.homeScreen.logic();
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

  private requestCanvasResize = () => {
    this.canvasNewSize = [window.innerWidth, window.innerHeight];
  };
}
