import { Spell } from "./spells";

export class Light implements Spell {
  // ms
  totalDuration = 2000;

  private currentTime: number = 0;

  isOver() {
    return this.currentTime >= this.totalDuration;
  }

  tick(deltaT: number) {
    this.currentTime += deltaT;
  }
}
