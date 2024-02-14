import { Minion } from "@model/minion";
import { Renderer, distanceFromTwoPoints } from "@ui/renderer";
import { EntityRenderer } from "@ui/types";
import { ShadowParticleAnimation } from "./shadow-particles-animation";

export class MinionRenderer implements EntityRenderer<Minion> {
  private particleAnimation = new ShadowParticleAnimation(
    {
      initialState: { particles: [] },
      length: 0,
    },
    this.minion
  );

  constructor(private minion: Minion) {}

  render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
    const positionInViewport = renderer.getPositionFromRealWordToPixels(
      this.minion.pos
    );
    const positionWithSizeInViewport = renderer.getPositionFromRealWordToPixels(
      [
        this.minion.pos[0] - this.minion.size[0] / 2,
        this.minion.pos[1],
        this.minion.pos[2],
      ]
    );

    if (!positionInViewport || !positionWithSizeInViewport) {
      return;
    }

    const [x, y] = positionInViewport;
    const halfSize = distanceFromTwoPoints(
      [x, y],
      [positionWithSizeInViewport[0], positionWithSizeInViewport[1]]
    );

    ctx.save();
    ctx.translate(x, y);

    ctx.save();

    this.particleAnimation.tick();
    this.particleAnimation.renderFrame(ctx, renderer);

    ctx.scale(1, this.minion.size[1] / this.minion.size[0]);

    const hpRatio = this.minion.hp / this.minion.totalHp;

    ctx.beginPath();
    ctx.rect(
      Math.round(-halfSize / 2),
      Math.round(-halfSize * 2.5),
      halfSize,
      5
    );
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(
      Math.round(-halfSize / 2),
      Math.round(-halfSize * 2.5),
      halfSize * hpRatio,
      5
    );
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, halfSize * 2, 0, 180);
    ctx.fillStyle = this.minion.hit ? "rgba(30, 30, 30)" : "black";
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(
      Math.round(halfSize / 4) * this.minion.direction[0],
      Math.round(halfSize / 4) * this.minion.direction[1]
    );

    ctx.beginPath();
    ctx.arc(0, 0, Math.round(halfSize / 2), 0, 180);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, -Math.round(halfSize), Math.round(halfSize * 0.1), 0, 360);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      Math.round(-halfSize / 3),
      -Math.round(halfSize),
      Math.round(halfSize * 0.1),
      0,
      360
    );
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }
}
