import { Position, Size } from "@model";
import { BasicRenderFunction } from "@ui/types";

export const drawColumn: BasicRenderFunction<{ pos: Position; size: Size }> = (
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
  ctx.rect(
    -Math.round(w * 0.4),
    -Math.round(h * 0.9),
    Math.round(w * 0.8),
    Math.round(h * 0.9)
  );
  ctx.rect(-Math.round(w * 0.5), -Math.round(h), w, h * 0.1);
  ctx.rect(
    -Math.round(w * 0.45),
    -Math.round(h * 0.95),
    Math.round(w * 0.9),
    h * 0.1
  );
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.restore();
};
