import { Position, Size } from "@model";
import { Renderer } from "@ui/renderer";

const skyCenter: Position = [0, 0, 30000];

export function draw(ctx: CanvasRenderingContext2D, renderer: Renderer) {
  const skyCenterPos = renderer.getPositionFromRealWordToPixels(skyCenter);

  if (!skyCenterPos) {
    return;
  }

  const [, y] = skyCenterPos;

  ctx.beginPath();
  ctx.rect(
    0,
    y,
    renderer.getCamera().viewportSize[0],
    -renderer.getCamera().viewportSize[1]
  );
  ctx.fillStyle = "#223957";
  ctx.fill();
  ctx.closePath();
}
