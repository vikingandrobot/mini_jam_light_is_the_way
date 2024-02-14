import { Renderer } from "@ui/renderer";
import { BasicRenderFunction } from "@ui/types";

export interface AnimationOptions<T> {
  length: number;
  initialState: T;
  repeat?: boolean;
}

/**
 * Extend this class to create a specific animation.
 */
export abstract class Animation<T> {
  private currentFrameIndex = 0;
  // In ms
  private length: number;
  private state: T;
  private isDone: boolean = false;
  private repeat: boolean;

  constructor({ length, initialState, repeat }: AnimationOptions<T>) {
    this.length = length;
    this.state = initialState;
    this.repeat = repeat ?? false;
  }

  tick() {
    this.currentFrameIndex += 1;
    this.state = this.updateState(this.state);
  }

  renderFrame(ctx: CanvasRenderingContext2D, renderer: Renderer) {
    this.render(ctx, renderer, this.state);
  }

  /**
   * This implementation should update the state of the animation to move the animation forward
   */
  protected abstract updateState(state: T): T;

  /**
   * This implementation should render the current state of the animation
   */
  protected abstract render(
    ctx: CanvasRenderingContext2D,
    renderer: Renderer,
    state: T
  ): void;
}
