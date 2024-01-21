import { BasicRenderFunction } from "@ui/types";
import { drawLightRune } from "./light-rune";
import { PowerWord, PowerWordRunes, Spell } from "@spells/spells";

interface PowerWordsContext {
  currentSpellCast: string;
  numberOfSlots: number;
  isCasted: boolean;
  positionInViewport?: [number, number];
  size?: number;
}

export const drawPowerWords: BasicRenderFunction<PowerWordsContext> = (
  ctx,
  renderer,
  { currentSpellCast, numberOfSlots, isCasted, positionInViewport, size }
) => {
  const [vw, vh] = renderer.getCamera().viewportSize;

  const slotWidth = size ?? Math.round(vw * 0.035);
  const margin = Math.round(slotWidth / 7);
  const totalWidth = (2 * margin + slotWidth) * numberOfSlots;

  ctx.save();

  const [x, y] = positionInViewport ?? [Math.round(vw / 2), vh - 3 * margin];

  ctx.translate(x, y);

  for (let i = 0; i < numberOfSlots; ++i) {
    ctx.save();
    const leftTopCornerX =
      Math.round(-totalWidth / 2 + i * (2 * margin + slotWidth)) + margin;

    if (!isCasted) {
      ctx.beginPath();
      ctx.rect(leftTopCornerX, -slotWidth, slotWidth, slotWidth);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3";
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.fill();
    }

    ctx.translate(leftTopCornerX + slotWidth / 2, -slotWidth / 2);
    if (i < currentSpellCast.length) {
      const magicWord = currentSpellCast.charAt(i);

      switch (magicWord) {
        case PowerWordRunes[PowerWord.Light]:
          ctx.beginPath();
          ctx.rect(-slotWidth / 2, -slotWidth / 2, slotWidth, slotWidth);
          ctx.fillStyle = "black";
          ctx.fill();
          drawLightRune(ctx, renderer, { size: slotWidth * 0.7 });
          break;
      }

      if (isCasted) {
        ctx.beginPath();
        ctx.rect(-slotWidth / 2, -slotWidth / 2, slotWidth, slotWidth);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  ctx.restore();
};
