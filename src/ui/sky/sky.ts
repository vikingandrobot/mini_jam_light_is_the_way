import { Position, Size } from "@model";
import { Renderer } from "@ui/renderer";

const skyCenter: Position = [0, 0, 30000];

export function draw(ctx: CanvasRenderingContext2D, renderer: Renderer) {
  const skyCenterPos = renderer.getPositionFromRealWordToPixels(skyCenter);

  if (!skyCenterPos) {
    return;
  }

  const [x, y] = skyCenterPos;
  const viewPortCenterX = Math.ceil(renderer.getCamera().viewportSize[0] / 2);

  const skyGradient = ctx.createLinearGradient(
    viewPortCenterX,
    0,
    viewPortCenterX,
    y
  );
  skyGradient.addColorStop(0, "black");
  skyGradient.addColorStop(1, "#223957");

  ctx.beginPath();
  ctx.rect(
    0,
    y,
    renderer.getCamera().viewportSize[0],
    -renderer.getCamera().viewportSize[1]
  );
  ctx.fillStyle = skyGradient;
  ctx.fill();
  ctx.closePath();
}
