import { Wizard } from "@model/wizard";
import { Renderer, distanceFromTwoPoints } from "../renderer/renderer";
import { drawStaff } from "./staff";

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

  const verticalSize = Math.floor(
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
  ctx.moveTo(0, -Math.floor(verticalSize * 0.75));
  ctx.lineTo(Math.floor(verticalSize / 4), 0);
  ctx.lineTo(-Math.floor(verticalSize / 4), 0);
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // HEAD
  ctx.beginPath();
  ctx.moveTo(0, -Math.floor(verticalSize * 0.75));
  ctx.lineTo(Math.floor(verticalSize * 0.2), -verticalSize);
  ctx.lineTo(-Math.floor(verticalSize * 0.2), -verticalSize);
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // HAT
  ctx.beginPath();
  ctx.moveTo(-Math.floor(verticalSize * 0.4), -Math.floor(verticalSize * 1.8));
  ctx.lineTo(Math.floor(verticalSize * 0.1), -Math.floor(verticalSize * 1.3));
  ctx.lineTo(Math.floor(verticalSize * 0.2), -Math.floor(verticalSize * 1.2));
  ctx.lineTo(Math.floor(verticalSize * 0.2), -Math.floor(verticalSize * 1.1));
  ctx.lineTo(Math.floor(verticalSize * 0.6), -Math.floor(verticalSize));
  ctx.lineTo(-Math.floor(verticalSize * 0.6), -Math.floor(verticalSize));
  ctx.lineTo(-Math.floor(verticalSize * 0.2), -Math.floor(verticalSize * 1.1));
  ctx.lineTo(-Math.floor(verticalSize * 0.2), -Math.floor(verticalSize * 1.3));
  ctx.fillStyle = "#453157";
  ctx.strokeStyle = "white";
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Staff
  drawStaff(ctx, renderer, { wizard, verticalSize });

  ctx.restore();
}
