import { LightOrb } from "@model/light-orb/";
import { EntityRenderer } from "../types";
import { Renderer, distanceFromTwoPoints } from "../renderer";
import { Position } from "@model";
import { Animation } from "@animation";

interface ParticalAnimationsState {
  // Positions in ratio of the radius
  particles: { pos: Position; speed: number; maxheight: number }[];
}

export class LightOrbRenderer implements EntityRenderer<LightOrb> {
  private particlesAnimation = new Animation<ParticalAnimationsState>({
    initialState: { particles: [] },
    length: 3000,
    repeat: true,
    updateState: ({ particles }: ParticalAnimationsState) => {
      let newParticles = particles;
      if (particles.length < 5) {
        if (Math.random() > 0.5) {
          particles.push({
            pos: [Math.random() * 2 - 1, Math.random() - 1, 0],
            speed: Math.random() / 25 + 0.02,
            maxheight: -Math.random() * 1 - 1,
          });
        }
      }

      for (let i = 0; i < particles.length; ++i) {
        const particle = particles[i];
        particle.pos[1] -= particle.speed;
      }

      newParticles = particles.filter((p) => p.pos[1] > p.maxheight);

      return {
        particles: newParticles,
      };
    },
    render: (
      ctx: CanvasRenderingContext2D,
      renderer: Renderer,
      { particles }: ParticalAnimationsState
    ) => {
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

      for (let i = 0; i < particles.length; ++i) {
        const particle = particles[i];
        const particlPos = [
          particle.pos[0] * radiusInViewport,
          particle.pos[1] * radiusInViewport,
        ];

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.arc(
          particlPos[0],
          particlPos[1],
          Math.floor(radiusInViewport / 15),
          0,
          360
        );
        ctx.fill();
      }
    },
  });

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
