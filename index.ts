import { Game } from "@game/game";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

const game: Game = new Game(canvas);

game.init();
