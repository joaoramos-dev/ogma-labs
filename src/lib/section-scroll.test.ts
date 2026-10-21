import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getSectionTarget } from "./section-scroll";

describe("staged reading boundaries", () => {
  test("scrolls upward from an aligned section", () => {
    assert.equal(getSectionTarget([0, 900, 1800], [900, 900, 900], 900, 900, 1800, -1), 0);
  });
  test("returns from the footer's reachable bottom anchor", () => {
    assert.equal(getSectionTarget([0, 900, 1800], [900, 900, 400], 1300, 900, 1300, -1), 900);
  });
  test("keeps tall content readable in both directions", () => {
    assert.equal(getSectionTarget([0, 900, 2900], [900, 2000, 900], 1300, 900, 2900, -1), null);
    assert.equal(getSectionTarget([0, 900, 2900], [900, 2000, 900], 1300, 900, 2900, 1), null);
  });
  test("lands on the last screen of a tall preceding section", () => {
    assert.equal(getSectionTarget([0, 900, 2900], [900, 2000, 900], 2900, 900, 2900, -1), 2000);
  });
});