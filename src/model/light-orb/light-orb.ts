import { Position } from "@model/types";

export interface LightOrb {
  pos: Position;
  // In meters
  radius: number;
}

export function makeLightOrb(pos: Position, radius: number): LightOrb {
  return {
    pos,
    radius,
  };
}
