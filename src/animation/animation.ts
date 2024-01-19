import { Renderer } from "@ui/renderer";
import { BasicRenderFunction } from "@ui/types";

export interface AnimationOptions<T> {
  length: number;
  initialState: T;
  repeat?: boolean;
  updateState: (state: T) => T;
  render: BasicRenderFunction<T>;
}

export class Animation<T> {
  private currentFrameIndex = 0;
  // In ms
  private length: number;
  private state: T;
  private isDone: boolean = false;
  private repeat: boolean;
  private updateState: (state: T) => T;
  public readonly render: BasicRenderFunction<T>;

  constructor({
    length,
    initialState,
    render,
    repeat,
    updateState,
  }: AnimationOptions<T>) {
    this.length = length;
    this.state = initialState;
    this.repeat = repeat ?? false;
    this.updateState = updateState;
    this.render = render;
  }

  tick() {
    this.currentFrameIndex += 1;
    this.state = this.updateState(this.state);
  }

  renderFrame(ctx: CanvasRenderingContext2D, renderer: Renderer) {
    this.render(ctx, renderer, this.state);
  }
}
