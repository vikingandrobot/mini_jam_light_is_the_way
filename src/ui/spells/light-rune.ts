import { BasicRenderFunction } from "@ui/types";

interface RuneOptions {
  size: number;
}

export const drawLightRune: BasicRenderFunction<any> = (
  ctx,
  _renderer,
  { size }
) => {
  const halfSize: number = Math.round(size / 2);

  ctx.beginPath();
  ctx.moveTo(-halfSize, -halfSize);
  ctx.lineTo(halfSize, halfSize);
  ctx.lineTo(halfSize, -halfSize);
  ctx.lineTo(-halfSize, halfSize);
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();
};
