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

  const verticalHalfSize = distanceFromTwoPoints(
    [posInViewport[0], posInViewport[1]],
    [posInViewportTopOfCharacter[0], posInViewportTopOfCharacter[1]]
  );

  const [x, y] = posInViewport;

  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.rect(
    -verticalHalfSize,
    -verticalHalfSize,
    2 * verticalHalfSize,
    2 * verticalHalfSize
  );
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}
