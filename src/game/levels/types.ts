export interface Level<T = LevelId> {
  readonly id: T;
  /**
   * This starts the level
   */
  init(): void;
  isDone(): boolean;
  /**
   * This increments the level physics and simulation by one frame
   */
  logic(deltaTInMs: number): void;
  /**
   * This renders the current state of the level
   */
  render(): void;
  finalState?: {
    score: number;
  };
}

export enum LevelId {
  "FirstLight" = "FirstLight",
}
