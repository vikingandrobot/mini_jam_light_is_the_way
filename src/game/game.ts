import { Camera } from "@camera";
import { HomeScreen } from "./home-screen";
import { Renderer } from "@ui/renderer";
import { draw as drawWizard } from "@ui/wizard";
import { Size } from "@model";

export class Game {
  private canvasNewSize: Size | null = null;
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  private homeScreen: HomeScreen;

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
    this.homeScreen = new HomeScreen(this.ctx, renderer);
  }

  tick() {
    if (this.canvasNewSize) {
      this.camera.setViewportWidth(this.canvasNewSize[0]);
      this.canvasNewSize = null;
    }

    this.homeScreen.logic();

    this.ctx.clearRect(
      0,
      0,
      this.camera.viewportSize[0],
      this.camera.viewportSize[1]
    );

    this.homeScreen.render();
  }

  init() {
    window.addEventListener("resize", this.requestCanvasResize, false);

    this.requestCanvasResize();

    document.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }

      if (event.code === "ArrowRight") {
        this.camera.zRotation += Math.PI / 64;
      }

      if (event.code === "ArrowLeft") {
        this.camera.zRotation -= Math.PI / 64;
      }

      if (event.code === "ArrowUp") {
        this.camera.pos[1] += 0.5;
      }

      if (event.code === "ArrowDown") {
        this.camera.pos[1] -= 0.5;
      }
      // do something

      console.log(event.code);
    });

    setInterval(() => {
      this.tick();
    }, 25);
  }

  private requestCanvasResize = () => {
    this.canvasNewSize = [window.innerWidth, window.innerHeight];
  };
}
