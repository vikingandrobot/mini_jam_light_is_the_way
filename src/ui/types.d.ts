import { Renderer } from "./renderer";

export type BasicRenderFunction<T> = (
  ctx: CanvasRenderingContext2D,
  renderer: Renderer,
  element: T
) => void;
