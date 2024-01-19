import { Wizard } from "@model/wizard";
import { BasicRenderFunction } from "@ui/types";

interface WizardDrawingContext {
  wizard: Wizard;
  verticalSize: number;
}

export const drawStaff: BasicRenderFunction<WizardDrawingContext> = (
  ctx,
  _renderer,
  { wizard, verticalSize }
) => {
  // Compute important positions
  const middleStaffX = Math.round(verticalSize * 0.5);
  const middleStaffY = -verticalSize * 0.5;

  const baseStaffX =
    middleStaffX - Math.round(Math.cos(wizard.aimAngle) * verticalSize);
  const baseStaffY =
    middleStaffY + Math.round(Math.sin(wizard.aimAngle) * verticalSize);

  const topStaffX =
    middleStaffX + Math.floor(Math.cos(wizard.aimAngle) * verticalSize);
  const topStaffY =
    middleStaffY - Math.floor(Math.sin(wizard.aimAngle) * verticalSize);

  // Staff stone halo
  const haloGradient = ctx.createRadialGradient(
    topStaffX,
    topStaffY,
    0,
    topStaffX,
    topStaffY,
    Math.floor(verticalSize / 2)
  );
  haloGradient.addColorStop(0, "white");
  haloGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.arc(topStaffX, topStaffY, Math.floor(verticalSize / 2), 0, 360);
  ctx.fillStyle = haloGradient;
  ctx.fill();

  // Staff light beam
  const stoneX = topStaffX;
  const stoneY = topStaffY;

  const lightBeamRadius = 12 * verticalSize;
  const lightBeamCenterX =
    Math.round(Math.cos(wizard.aimAngle) * lightBeamRadius) + stoneX;
  const lightBeamCenterY =
    -Math.round(Math.sin(wizard.aimAngle) * lightBeamRadius) + stoneY;

  const smallLightGradient = ctx.createLinearGradient(
    stoneX,
    stoneY,
    lightBeamCenterX,
    lightBeamCenterY
  );
  smallLightGradient.addColorStop(0, "rgba(255, 255, 255, 0.8");
  smallLightGradient.addColorStop(1, "rgba(255, 255, 255, 0");

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.beginPath();
  ctx.arc(
    stoneX,
    stoneY,
    lightBeamRadius,
    -wizard.aimAngle - Math.PI / 12,
    -wizard.aimAngle + Math.PI / 12
  );
  ctx.lineTo(stoneX, stoneY);
  ctx.fillStyle = smallLightGradient;
  ctx.fill();
  ctx.restore();

  // Staff stick
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(baseStaffX, baseStaffY);
  ctx.lineTo(topStaffX, topStaffY);
  ctx.lineWidth = Math.ceil(verticalSize * 0.08);
  ctx.stroke();

  // Staff stone
  const stoneGradient = ctx.createRadialGradient(
    stoneX,
    stoneY,
    0,
    stoneX,
    stoneY,
    Math.floor(verticalSize / 5)
  );
  stoneGradient.addColorStop(0, "#453157");
  stoneGradient.addColorStop(1, "white");

  ctx.beginPath();
  ctx.arc(stoneX, stoneY, Math.floor(verticalSize / 5), 0, 360);
  ctx.fillStyle = stoneGradient;
  ctx.fill();
};
