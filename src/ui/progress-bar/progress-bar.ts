import { Position, Size } from "@model";
import { BasicRenderFunction } from "@ui/types";

export interface ProgressBarOptions {
  color: string;
  percentage: number;
  pos: Position;
  size: Size;
}

export const renderProgressBar: BasicRenderFunction<ProgressBarOptions> = (
  ctx,
  _renderer,
  { color, percentage, pos, size }
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.rect(pos[0], pos[1], size[0], size[1]);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(pos[0], pos[1], percentage * size[0], size[1]);
  ctx.fill();
  ctx.closePath();
};
