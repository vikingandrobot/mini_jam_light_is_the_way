import { Wizard, makeWizard } from "@model/wizard";
import { LightOrbRenderer } from "@ui/light-orb";
import { draw as drawSky } from "@ui/sky";
import { draw as drawWizard } from "@ui/wizard";
import { Renderer } from "@ui/renderer";
import { Position } from "@model";
import { LightOrb, makeLightOrb } from "@model/light-orb";
import { BasicRenderFunction } from "@ui/types";
import { Input, InputsManager } from "@inputs";
import { Minion } from "@model/minion";
import { MinionRenderer } from "@ui/minion";

const GAME_TITLE = "A Light in the Dark";
const START_LABEL = "Press the [SPACE] key to start";

interface Text {
  title: string;
  position: Position;
}

export class HomeScreen {
  private startLabel: Text = {
    title: START_LABEL,
    position: [0, 0, 5],
  };

  private gameTitle: Text = {
    title: GAME_TITLE,
    position: [3, 2, 30],
  };

  private groundPosition: Position = [0, 1, 10];

  private wizard: Wizard = makeWizard({ pos: [-8, 1, 10], size: 1.8 });
  private orb: LightOrb = makeLightOrb([-5, 7, 10], 1);
  private orbDirection = 1;
  private orbRenderer = new LightOrbRenderer(this.orb);
  private minion = new Minion([0, 7, 10], [3, 2]);
  private minionRenderer = new MinionRenderer(this.minion);

  private done: boolean = false;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer,
    private inputsManager: InputsManager
  ) {}

  isDone(): boolean {
    return this.done;
  }

  init() {
    this.renderer.getCamera().pos = [0, 20, 0];
  }

  render() {
    drawSky(this.ctx, this.renderer);

    drawTitle(this.ctx, this.renderer, this.gameTitle);
    this.orbRenderer.render(this.ctx, this.renderer);

    drawWizard(this.ctx, this.renderer, this.wizard);
    drawGround(this.ctx, this.renderer, this.groundPosition);
    drawStartLabel(this.ctx, this.renderer, this.startLabel);
    this.minionRenderer.render(this.ctx, this.renderer);
  }

  logic() {
    this.orb.pos[1] += this.orbDirection * 0.01;

    if (this.orbDirection > 0 && this.orb.pos[1] > 7.1) {
      this.orbDirection = -1;
    } else if (this.orbDirection < 0 && this.orb.pos[1] < 6.9) {
      this.orbDirection = 1;
    }

    const cameraPos = this.renderer.getCamera().pos;

    if (cameraPos[1] >= 5) {
      this.renderer
        .getCamera()
        .centerCamera([cameraPos[0], cameraPos[1] - 0.15, cameraPos[2]]);
    }

    /**
     * For now we use this check to decide if the player can start the game
     */
    if (cameraPos[1] <= 5) {
      if (this.inputsManager.isInputEnabled(Input.Space)) {
        this.done = true;
      }
    }
  }
}

const drawStartLabel: BasicRenderFunction<Text> = (
  ctx,
  renderer,
  startLabel
) => {
  const titlePosition = renderer.getPositionFromRealWordToPixels(
    startLabel.position
  );

  if (!titlePosition) {
    return;
  }
  const viewportWidth = renderer.getCamera().viewportSize[0];
  const titleWidth = Math.floor(viewportWidth / 2);

  const [titleX, titleY] = titlePosition;

  ctx.font = "18px arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(startLabel.title, titleX, titleY, titleWidth);
};

const drawTitle: BasicRenderFunction<Text> = (ctx, renderer, gameTitle) => {
  const titlePosition = renderer.getPositionFromRealWordToPixels(
    gameTitle.position
  );

  if (!titlePosition) {
    return;
  }
  const viewportWidth = renderer.getCamera().viewportSize[0];
  const titleWidth = Math.floor(viewportWidth / 2);

  const [titleX, titleY] = titlePosition;

  ctx.font = "70px Zeyada";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(gameTitle.title, titleX, titleY, titleWidth);
};

const drawGround: BasicRenderFunction<Position> = (
  ctx,
  renderer,
  groundPosition
) => {
  const groundPositionInViewport =
    renderer.getPositionFromRealWordToPixels(groundPosition);

  if (!groundPositionInViewport) {
    return null;
  }

  const [, y] = groundPositionInViewport;
  const [vw, vh] = renderer.getCamera().viewportSize;

  ctx.beginPath();
  ctx.rect(0, y, vw, vh);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  const stone1Ratio = Math.floor(vw / 10);
  ctx.ellipse(0, y, stone1Ratio, Math.floor(stone1Ratio * 0.4), 0, 0, 360);
  ctx.ellipse(
    Math.floor(vw / 10),
    y,
    Math.floor(stone1Ratio * 0.5),
    Math.floor(stone1Ratio * 0.2),
    0,
    0,
    360
  );

  const stone2Ratio = Math.floor(vw / 25);
  ctx.ellipse(
    Math.floor(vw / 7.5),
    y,
    stone2Ratio,
    Math.floor(stone2Ratio * 0.4),
    0,
    0,
    360
  );
  ctx.ellipse(
    Math.floor(vw / 6),
    y,
    Math.floor(stone2Ratio * 0.5),
    Math.floor(stone2Ratio * 0.2),
    0,
    0,
    360
  );

  const stone3Ratio = Math.floor(vw / 30);
  ctx.ellipse(
    Math.floor(vw * 0.5),
    y,
    stone3Ratio,
    Math.floor(stone3Ratio * 0.4),
    0,
    0,
    360
  );
  ctx.ellipse(
    Math.floor(vw * 0.5),
    y,
    Math.floor(stone3Ratio * 0.5),
    Math.floor(stone3Ratio * 0.2),
    0,
    0,
    360
  );

  const stone4Ratio = Math.floor(vw / 15);
  ctx.ellipse(
    Math.floor(vw * 0.9),
    y,
    Math.floor(stone4Ratio * 0.5),
    Math.floor(stone4Ratio * 0.2),
    0,
    0,
    360
  );
  ctx.ellipse(
    Math.floor(vw * 0.95),
    y,
    stone4Ratio,
    Math.floor(stone4Ratio * 0.4),
    0,
    0,
    360
  );

  ctx.fillStyle = "black";
  ctx.fill();
};
