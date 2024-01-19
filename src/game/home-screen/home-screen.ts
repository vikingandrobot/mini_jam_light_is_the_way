import { Wizard, makeWizard } from "@model/wizard";
import { draw as drawSky } from "@ui/sky";
import { draw as drawWizard } from "@ui/wizard";
import { Renderer } from "@ui/renderer";
import { Position } from "@model";

const GAME_TITLE = "Light in the Dark";

export class HomeScreen {
  private gameTitle = {
    title: GAME_TITLE,
    position: [0, 10, 60] as Position,
  };

  private wizard: Wizard = makeWizard({ pos: [0, 0, 30], size: 1.8 });
  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer
  ) {}

  init() {
    this.renderer.getCamera().pos = [0, 5, 0];
  }

  render() {
    const titlePosition = this.renderer.getPositionFromRealWordToPixels(
      this.gameTitle.position
    );

    if (!titlePosition) {
      return;
    }

    const viewportWidth = this.renderer.getCamera().viewportSize[0];
    const titleWidth = Math.floor(viewportWidth / 2);

    const [titleX, titleY] = titlePosition;

    drawSky(this.ctx, this.renderer);
    this.ctx.font = "80px Zeyada";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.gameTitle.title, titleX, titleY, titleWidth);
    drawWizard(this.ctx, this.renderer, this.wizard);
  }

  logic() {}
}
