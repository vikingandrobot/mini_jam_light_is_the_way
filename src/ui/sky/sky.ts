import { Position, Size } from "@model";
import { Renderer } from "@ui/renderer";

const skyCenter: Position = [0, 0, 30000];

export function draw(ctx: CanvasRenderingContext2D, renderer: Renderer) {
  const skyCenterPos = renderer.getPositionFromRealWordToPixels(skyCenter);

  if (!skyCenterPos) {
    return;
  }

  const [, y] = skyCenterPos;
  const viewPortCenterX = Math.ceil(renderer.getCamera().viewportSize[0] / 2);

  const skyGradient = ctx.createLinearGradient(
    viewPortCenterX,
    0,
    viewPortCenterX,
    renderer.getCamera().viewportSize[1]
  );
  skyGradient.addColorStop(0.5, "#223957");
  skyGradient.addColorStop(1, "black");

  ctx.beginPath();
  ctx.rect(
    0,
    0,
    renderer.getCamera().viewportSize[0],
    renderer.getCamera().viewportSize[1]
  );
  ctx.fillStyle = skyGradient;
  ctx.fill();
  ctx.closePath();
}
