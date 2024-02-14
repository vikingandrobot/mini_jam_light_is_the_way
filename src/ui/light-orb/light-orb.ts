import { LightOrb } from "@model/light-orb/";
import { EntityRenderer } from "../types";
import { Renderer, distanceFromTwoPoints } from "../renderer";
import { Position } from "@model";
import { Animation } from "@animation";
import {
  ParticalAnimationsState,
  ParticlesAnimation,
} from "./particles-animation";

export class LightOrbRenderer implements EntityRenderer<LightOrb> {
  private particlesAnimation: ParticlesAnimation = new ParticlesAnimation(
    {
      initialState: { particles: [] },
      length: 3000,
      repeat: true,
    },
    this.lightOrb
  );

  constructor(private lightOrb: LightOrb) {}

  render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
    const { pos, radius } = this.lightOrb;

    const posInViewPort = renderer.getPositionFromRealWordToPixels(pos);
    const posPlusRadius = renderer.getPositionFromRealWordToPixels([
      pos[0] + Math.sin(Math.PI / 4) * radius,
      pos[1] + +Math.sin(Math.PI / 4) * radius,
      pos[2],
    ]);

    if (!posInViewPort || !posPlusRadius) {
      return;
    }

    const [x, y] = posInViewPort;
    const radiusInViewport = distanceFromTwoPoints(
      [x, y],
      [posPlusRadius[0], posPlusRadius[1]]
    );

    this.particlesAnimation.tick();

    ctx.save();

    ctx.translate(x, y);

    const orbGradient = ctx.createRadialGradient(
      0,
      0,
      Math.floor(radiusInViewport * 0.7),
      0,
      0,
      radiusInViewport * 1.5
    );
    orbGradient.addColorStop(0, "white");
    orbGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.arc(0, 0, radiusInViewport * 1.5, 0, 360);
    ctx.fillStyle = orbGradient;
    ctx.fill();

    this.particlesAnimation.renderFrame(ctx, renderer);

    ctx.restore();
  }
}
