import { Size } from "@model/types";
import { Wizard, makeWizard } from "@model/wizard";
import { draw as drawPlanet } from "@ui/wizard";
import { Camera, Renderer } from "@ui/renderer";

const DELTA_T = 0.04; // 1/25 second

let canvasNewSize: Size | null = null;

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const camera: Camera = new Camera([0, 0, 0], [20, 10], 600, canvas);

const renderer = new Renderer(camera);

const wizard: Wizard = makeWizard({ pos: [0, 0, 30], size: 1.8 });

function render() {
  if (canvasNewSize) {
    camera.setViewportWidth(canvasNewSize[0]);
    canvasNewSize = null;
  }

  ctx.clearRect(0, 0, camera.viewportSize[0], camera.viewportSize[1]);

  const objects = [wizard];
  const sortedObject = objects.sort((a, b) => b.pos[2] - a.pos[2]);

  for (let i = 0; i < sortedObject.length; ++i) {
    drawPlanet(ctx, renderer, sortedObject[i]);
  }
}

render();

setInterval(() => {
  render();
}, 25);

window.addEventListener("resize", requestCanvasResize, false);

function requestCanvasResize() {
  canvasNewSize = [window.innerWidth, window.innerHeight];
  render();
}
requestCanvasResize();

document.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  if (event.code === "ArrowRight") {
    camera.zRotation += Math.PI / 64;
  }

  if (event.code === "ArrowLeft") {
    camera.zRotation -= Math.PI / 64;
  }

  if (event.code === "ArrowUp") {
    camera.pos[2] += 2;
  }

  if (event.code === "ArrowDown") {
    camera.pos[2] -= 2;
  }
  // do something

  console.log(event.code);
});
