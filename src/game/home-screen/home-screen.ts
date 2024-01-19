import { Wizard, makeWizard } from "@model/wizard";
import { LightOrbRenderer } from "@ui/light-orb";
import { draw as drawSky } from "@ui/sky";
import { draw as drawWizard } from "@ui/wizard";
import { Renderer } from "@ui/renderer";
import { Position } from "@model";
import { LightOrb, makeLightOrb } from "@model/light-orb";
import { BasicRenderFunction } from "@ui/types";

const GAME_TITLE = "Light in the Dark";

interface GameTitle {
  title: string;
  position: Position;
}

export class HomeScreen {
  private gameTitle: GameTitle = {
    title: GAME_TITLE,
    position: [3, 1, 15],
  };

  private wizard: Wizard = makeWizard({ pos: [-8, 1, 10], size: 1.8 });
  private orb: LightOrb = makeLightOrb([-5, 7, 10], 1);
  private orbRenderer = new LightOrbRenderer(this.orb);

  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer
  ) {}

  init() {
    this.renderer.getCamera().pos = [0, 5, 0];
  }

  render() {
    drawSky(this.ctx, this.renderer);

    drawTitle(this.ctx, this.renderer, this.gameTitle);
    this.orbRenderer.render(this.ctx, this.renderer);

    drawWizard(this.ctx, this.renderer, this.wizard);
  }

  logic() {}
}

const drawTitle: BasicRenderFunction<GameTitle> = (
  ctx,
  renderer,
  gameTitle
) => {
  const titlePosition = renderer.getPositionFromRealWordToPixels(
    gameTitle.position
  );

  if (!titlePosition) {
    return;
  }
  const viewportWidth = renderer.getCamera().viewportSize[0];
  const titleWidth = Math.floor(viewportWidth / 2);

  const [titleX, titleY] = titlePosition;

  ctx.font = "80px Zeyada";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(gameTitle.title, titleX, titleY, titleWidth);
};
