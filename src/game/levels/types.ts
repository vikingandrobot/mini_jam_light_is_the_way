export interface Level {
  readonly id: LevelId;
  /**
   * This starts the level
   */
  init(): void;
  isDone(): boolean;
  /**
   * This increments the level physics and simulation by one frame
   */
  logic(): void;
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