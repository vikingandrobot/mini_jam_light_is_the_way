import { Wizard, makeWizard } from "@model/wizard";
import { draw as drawSky } from "@ui/sky";
import { draw as drawWizard } from "@ui/wizard";
import { Renderer } from "@ui/renderer";

export class HomeScreen {
  private wizard: Wizard = makeWizard({ pos: [0, 0, 30], size: 1.8 });
  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer
  ) {}

  render() {
    drawSky(this.ctx, this.renderer);
    drawWizard(this.ctx, this.renderer, this.wizard);
  }

  logic() {}
}
