import { Animation, AnimationOptions } from "@animation";
import { Position } from "@model";
import { Minion } from "@model/minion";
import { Renderer, distanceFromTwoPoints } from "@ui/renderer";

interface ShadowParticleAnimationState {
  particles: {
    // Position in percentage of the size of the minion relative to the center of the minion
    pos: Position;
    // Size in pixels
    size: number;
  }[];
}

export class ShadowParticleAnimation extends Animation<ShadowParticleAnimationState> {
  constructor(
    options: AnimationOptions<ShadowParticleAnimationState>,
    private minion: Minion
  ) {
    super(options);
  }

  protected updateState(
    state: ShadowParticleAnimationState
  ): ShadowParticleAnimationState {
    if (state.particles.length < 20 && Math.random() < 0.05) {
      state.particles.push({
        pos: [Math.random() * 1.8 - 0.9, Math.random() * 2 - 2, 0],
        size: 1,
      });
    }

    for (let i = 0; i < state.particles.length; ++i) {
      const particle = state.particles[i];
      particle.size += 0.1;
    }

    const newParticles = state.particles.filter((p) => p.size < 30);
    return {
      particles: newParticles,
    };
  }
  protected render(
    ctx: CanvasRenderingContext2D,
    renderer: Renderer,
    { particles }: ShadowParticleAnimationState
  ): void {
    const { pos, size } = this.minion;

    const posInViewPort = renderer.getPositionFromRealWordToPixels(pos);
    const posPlusRadius = renderer.getPositionFromRealWordToPixels([
      pos[0] + size[0] / 2,
      pos[1] + size[1] / 2,
      pos[2],
    ]);

    if (!posInViewPort || !posPlusRadius) {
      return;
    }

    const [x, y] = posInViewPort;
    const widthInViewport = distanceFromTwoPoints(
      [x, y],
      [posPlusRadius[0], y]
    );
    const heightInViewport = distanceFromTwoPoints(
      [x, y],
      [x, posPlusRadius[1]]
    );

    for (let i = 0; i < particles.length; ++i) {
      const particle = particles[i];
      const particlPos = [
        particle.pos[0] * widthInViewport,
        particle.pos[1] * heightInViewport,
      ];

      const alpha =
        particle.size <= 20 ? 1 : 1 - Math.round(particle.size - 20) / 10;

      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
      ctx.arc(particlPos[0], particlPos[1], particle.size, 0, 360);
      ctx.fill();
    }
  }
}
