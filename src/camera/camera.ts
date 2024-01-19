import { Position, Size } from "@model/types";

export type Matrix3D = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];
export type MatrixPoint = [[number], [number], [number]];

export function multiply(A: Matrix3D, B: MatrixPoint) {
  const C: [[number], [number], [number]] = [[0], [0], [0]];

  for (let i = 0; i < A.length; ++i) {
    for (let j = 0; j < B[0].length; ++j) {
      const rowA = A[i];
      const columnB = B.map((row) => row[j]);

      const val: number = rowA.reduce((acc, a, index) => {
        return acc + a * columnB[index];
      }, 0);

      C[i][j] = Math.abs(val - 0) < 0.00000001 ? 0 : val;
    }
  }

  return C;
}

export function toRightHanded(point: MatrixPoint): MatrixPoint {
  const [x, z, y] = point;
  return [x, y, z];
}

export function toLeftHanded(point: MatrixPoint): MatrixPoint {
  const [x, z, y] = point;
  return [x, y, z];
}

export class Camera {
  pos: Position;
  size: Size;
  focalLength: number = 20;

  // Rotation around the z axis
  zRotation: number = 0;

  get viewportSize(): Size {
    const ratio = this.size[1] / this.size[0];
    return [this.viewportWidth, Math.round(this.viewportWidth * ratio)];
  }

  private canvas: HTMLCanvasElement;
  private viewportWidth: number;

  constructor(
    pos: Position,
    size: Size,
    viewportWidth: number,
    canvas: HTMLCanvasElement
  ) {
    this.pos = [...pos];
    this.size = [...size];
    this.viewportWidth = viewportWidth;
    this.canvas = canvas;
  }

  setViewportWidth(width: number) {
    this.viewportWidth = width;
    this.canvas.width = this.viewportSize[0];
    this.canvas.height = this.viewportSize[1];
  }

  centerCamera(pos: Position) {
    this.pos[0] = pos[0];
    this.pos[1] = pos[1];
    this.pos[2] = pos[2];
  }
}
