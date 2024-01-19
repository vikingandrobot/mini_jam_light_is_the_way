import { Size } from "@model/types";
import { Wizard, makeWizard } from "@model/wizard";
import { Game } from "@game/game";

const DELTA_T = 0.04; // 1/25 second

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

const game: Game = new Game(canvas);

game.init();
