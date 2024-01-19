import assert from "node:assert";
import test, { describe } from "node:test";

describe("Renderer", () => {
  test("creates a test", () => {
    const a = 2;

    assert.deepEqual(a, 2);
  });
});
