import { Wizard } from "@model/wizard";
import { Renderer, distanceFromTwoPoints } from "../renderer/renderer";

export function draw(
  ctx: CanvasRenderingContext2D,
  renderer: Renderer,
  wizard: Wizard
) {
  const posInRealWorld = wizard.pos;
  const posInViewport =
    renderer.getPositionFromRealWordToPixels(posInRealWorld);
  const posInViewportTopOfCharacter = renderer.getPositionFromRealWordToPixels([
    posInRealWorld[0],
    posInRealWorld[1] + wizard.size,
    posInRealWorld[2],
  ]);

  if (!posInViewport || !posInViewportTopOfCharacter) {
    return;
  }

  const verticalHalfSize = Math.floor(
    distanceFromTwoPoints(
      [posInViewport[0], posInViewport[1]],
      [posInViewportTopOfCharacter[0], posInViewportTopOfCharacter[1]]
    )
  );

  const [x, y] = posInViewport;

  ctx.save();
  ctx.translate(x, y);

  // BODY
  ctx.beginPath();
  ctx.moveTo(0, -verticalHalfSize / 2);
  ctx.lineTo(Math.floor(verticalHalfSize / 2), Math.floor(verticalHalfSize));
  ctx.lineTo(-Math.floor(verticalHalfSize / 2), Math.floor(verticalHalfSize));
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // HEAD
  ctx.beginPath();
  ctx.moveTo(0, -verticalHalfSize / 2);
  ctx.lineTo(Math.floor(verticalHalfSize / 3), -Math.floor(verticalHalfSize));
  ctx.lineTo(-Math.floor(verticalHalfSize / 3), -Math.floor(verticalHalfSize));
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // HAT
  ctx.beginPath();
  ctx.moveTo(
    -Math.floor(verticalHalfSize / 2),
    -Math.floor(verticalHalfSize * 2.5)
  );
  ctx.lineTo(
    Math.floor(verticalHalfSize * 0.4),
    -Math.floor(verticalHalfSize * 1.2)
  );
  ctx.lineTo(Math.floor(verticalHalfSize * 0.8), -Math.floor(verticalHalfSize));
  ctx.lineTo(
    -Math.floor(verticalHalfSize * 0.8),
    -Math.floor(verticalHalfSize)
  );
  ctx.lineTo(
    -Math.floor(verticalHalfSize * 0.4),
    -Math.floor(verticalHalfSize * 1.2)
  );
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // STAFF HALO
  const haloGradient = ctx.createRadialGradient(
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    0,
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    Math.floor(verticalHalfSize / 2)
  );
  haloGradient.addColorStop(0, "white");
  haloGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.arc(
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    Math.floor(verticalHalfSize / 2),
    0,
    360
  );
  ctx.fillStyle = haloGradient;
  ctx.fill();

  // STAFF

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(
    Math.ceil(verticalHalfSize / 1.5),
    -Math.floor(2 * verticalHalfSize),
    Math.floor(verticalHalfSize / 6),
    Math.floor(verticalHalfSize * 3)
  );
  ctx.fill();

  const stoneGradient = ctx.createRadialGradient(
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    0,
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    Math.floor(verticalHalfSize / 5)
  );
  stoneGradient.addColorStop(0, "#453157");
  stoneGradient.addColorStop(1, "white");

  ctx.beginPath();
  ctx.arc(
    Math.ceil(verticalHalfSize / 1.5) + Math.floor(verticalHalfSize / 12),
    -Math.floor(2 * verticalHalfSize),
    Math.floor(verticalHalfSize / 5),
    0,
    360
  );
  ctx.fillStyle = stoneGradient;
  ctx.fill();

  ctx.restore();
}
