import assert from "node:assert";
import test, { describe } from "node:test";
import { Camera, Matrix3D, MatrixPoint, multiply } from "./camera";

describe("Camera", () => {
  describe("viewportSize", () => {
    test("computes the viewport height based on the ratio of the camera", () => {
      const camera = new Camera([500, 500, 0], [800, 600], 400, {} as any);
      assert.deepEqual(camera.viewportSize, [400, 300]);
    });
  });

  describe("multiply()", () => {
    test("multiplies by identity matrix", () => {
      const A: Matrix3D = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];

      const B: MatrixPoint = [[5], [12], [3]];

      const r = multiply(A, B);
      assert.deepEqual(r, B);
    });

    test("multiplies by 2", () => {
      const A: Matrix3D = [
        [2, 0, 0],
        [0, 2, 0],
        [0, 0, 2],
      ];

      const B: MatrixPoint = [[5], [12], [3]];
      const BExpected: MatrixPoint = [[10], [24], [6]];

      const r = multiply(A, B);
      assert.deepEqual(r, BExpected);
    });

    test("multiplies matrixes", () => {
      const A: Matrix3D = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      const B: MatrixPoint = [[5], [12], [3]];
      const BExpected: MatrixPoint = [[20], [20], [20]];

      const r = multiply(A, B);
      assert.deepEqual(r, BExpected);
    });

    test("multiplies by a rotation matrix around the y axis", () => {
      const angle = Math.PI / 2;

      const A: Matrix3D = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)],
      ];

      const B: MatrixPoint = [[12], [12], [0]];
      const BExpected: MatrixPoint = [[0], [12], [-12]];

      const r = multiply(A, B);
      assert.deepEqual(r, BExpected);
    });
  });
});
