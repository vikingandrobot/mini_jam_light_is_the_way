import { Level } from "@game/levels/types";
import { ScreenId } from "./types";
import { Renderer } from "@ui/renderer";
import { draw as drawSky } from "@ui/sky";
import { BasicRenderFunction } from "@ui/types";
import { Input, InputsManager } from "@inputs";
import { Position, Size } from "@model";
import { PowerWord } from "@spells";
import { writeBottomInstructionText, writeTopInstructionText } from "@ui/text";
import { drawLightRune } from "@ui/spells/light-rune";
import { drawPowerWords } from "@ui/spells/power-words";

const CONTROLS_TEXT =
  "You learned the 'Wu' Rune for light. Spells are cast by composing runes. You have learned the 'Light Beam' spell. Use this spell to light your surroundings and hurt small Darkness monsters.";

const INSTRUCTION_TEST = "Press [SPACE] to continue";

export class NewSpellLearned implements Level<ScreenId> {
  id = ScreenId.NewSpellLearned;

  private continue: boolean = false;

  private groundPosition: Position = [0, 0, 20];
  private backgroundPosition: Position = [0, 0, 30];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private renderer: Renderer,
    private inputsManager: InputsManager
  ) {}

  init() {}

  isDone(): boolean {
    return this.continue;
  }

  logic(deltaTInMs: number): void {
    this.actOnPlayerInputs();
  }

  render(): void {
    drawSky(this.ctx, this.renderer);
    drawBackground(this.ctx, this.renderer, this.backgroundPosition);
    drawGround(this.ctx, this.renderer, this.groundPosition);

    drawLightRuneAchievement(this.ctx, this.renderer, undefined);
    drawLightSpellAchievement(this.ctx, this.renderer, undefined);

    writeTopInstructionText(CONTROLS_TEXT);

    writeBottomInstructionText(INSTRUCTION_TEST);
  }

  private actOnPlayerInputs() {
    if (this.inputsManager.isInputEnabled(Input.Space)) {
      this.continue = true;
    }
  }
}

const drawLightRuneAchievement: BasicRenderFunction<undefined> = (
  ctx,
  renderer
) => {
  const [vw, vh] = renderer.getCamera().viewportSize;

  ctx.save();
  ctx.translate(Math.round(vw / 2) + 20, Math.round(vh * 0.4));

  ctx.beginPath();
  ctx.rect(
    -Math.round(vh * 0.035),
    -Math.round(vh * 0.035),
    Math.round(vh * 0.07),
    Math.round(vh * 0.07)
  );
  ctx.fillStyle = "black";
  ctx.fill();

  drawLightRune(ctx, renderer, { size: Math.round(vh * 0.05) });
  ctx.restore();

  ctx.save();
  ctx.translate(Math.round(vw / 2) - 20, Math.round(vh * 0.4) + 6);
  ctx.textAlign = "right";
  ctx.fillStyle = "white";
  ctx.font = "22px Arial";
  ctx.fillText("'Wu' rune:", 0, 0);

  ctx.restore();
};

const drawLightSpellAchievement: BasicRenderFunction<undefined> = (
  ctx,
  renderer
) => {
  const [vw, vh] = renderer.getCamera().viewportSize;

  ctx.save();
  ctx.translate(Math.round(vw / 2) + 20, Math.round(vh * 0.6));

  drawPowerWords(ctx, renderer, {
    currentSpellCast: "L",
    numberOfSlots: 5,
    isCasted: false,
    positionInViewport: [70, 15],
    size: 30,
  });
  ctx.restore();

  ctx.save();
  ctx.translate(Math.round(vw / 2) - 20, Math.round(vh * 0.6) + 6);
  ctx.textAlign = "right";
  ctx.fillStyle = "white";
  ctx.font = "22px Arial";
  ctx.fillText("'Light beam' spell:", 0, 0);

  ctx.restore();
};

const drawColumn: BasicRenderFunction<{ pos: Position; size: Size }> = (
  ctx,
  renderer,
  { pos, size }
) => {
  const columnPositionInViewport =
    renderer.getPositionFromRealWordToPixels(pos);
  const columnTopRightPositionInViewport =
    renderer.getPositionFromRealWordToPixels([
      pos[0] + size[0],
      pos[1] + size[1],
      pos[2],
    ]);

  if (!columnPositionInViewport || !columnTopRightPositionInViewport) {
    return;
  }
  const [x, y] = columnPositionInViewport;
  const w = columnTopRightPositionInViewport[0] - x;
  const h = y - columnTopRightPositionInViewport[1];

  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.rect(-Math.round(w * 0.4), -Math.round(h * 0.9), w * 0.8, h * 0.9);
  ctx.rect(-Math.round(w * 0.5), -Math.round(h), w, h * 0.1);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.restore();
};

const drawBackground: BasicRenderFunction<Position> = (
  ctx,
  renderer,
  backgroundPosition
) => {
  const bgPositionInViewport =
    renderer.getPositionFromRealWordToPixels(backgroundPosition);

  if (!bgPositionInViewport) {
    return null;
  }

  const [, y] = bgPositionInViewport;
  const [vw, vh] = renderer.getCamera().viewportSize;

  drawColumn(ctx, renderer, { pos: [-25, -6, 40], size: [6, 20] });
  drawColumn(ctx, renderer, { pos: [-17, -9, 40], size: [6, 20] });

  drawColumn(ctx, renderer, { pos: [15, -6, 40], size: [3, 20] });
  drawColumn(ctx, renderer, { pos: [20, -8, 40], size: [3, 20] });
  drawColumn(ctx, renderer, { pos: [25, -5, 40], size: [3, 20] });
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
    Math.floor(vw * 0.6),
    y,
    stone3Ratio,
    Math.floor(stone3Ratio * 0.4),
    0,
    0,
    360
  );
  ctx.ellipse(
    Math.floor(vw * 0.6),
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
