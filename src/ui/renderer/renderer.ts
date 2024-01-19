import {
  Camera,
  Matrix3D,
  MatrixPoint,
  multiply,
  toLeftHanded,
  toRightHanded,
} from "@camera";
import { Position, Size } from "@model/types";

export class Renderer {
  private camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
  }

  getCamera(): Camera {
    return this.camera;
  }

  getPositionFromRealWordToPixels(pos: Position): Position | null {
    const zAngle = this.camera.zRotation;

    const rotationMatrix: Matrix3D = [
      [Math.cos(zAngle), -Math.sin(zAngle), 0],
      [Math.sin(zAngle), Math.cos(zAngle), 0],
      [0, 0, 1],
    ];

    const f = this.camera.focalLength;
    const cameraCenterX = this.camera.size[0] / 2;
    const cameraCenterY = this.camera.size[1] / 2;

    const viewportCenterX = this.camera.viewportSize[0] / 2;
    const viewportCenterY = this.camera.viewportSize[1] / 2;
    const [xc, yc, zc] = this.camera.pos;
    const matrixPoint: MatrixPoint = [
      pos[0] - xc,
      pos[1] - yc,
      pos[2] - zc,
    ].map((a) => [a]) as MatrixPoint;
    const rotatedMatrixPoint = multiply(
      rotationMatrix,
      toRightHanded(matrixPoint)
    );
    const [x, y, z] = toLeftHanded(rotatedMatrixPoint).map((a) => a[0]);

    if (z <= 0) {
      return null;
    }

    const xa = (f * x) / (z + f) + cameraCenterX;
    const ya = cameraCenterY - (f * y) / (z + f);

    const renderX = (xa / cameraCenterX) * viewportCenterX;
    const renderY = (ya / cameraCenterY) * viewportCenterY;

    if (
      renderX < -1 * this.camera.viewportSize[0] ||
      renderX > 2 * this.camera.viewportSize[0] ||
      renderY < -1 * this.camera.viewportSize[1] ||
      renderY > 2 * this.camera.viewportSize[1]
    ) {
      return null;
    }

    return [renderX, renderY, 0];
  }
}

export function distanceFromTwoPoints(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): number {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
