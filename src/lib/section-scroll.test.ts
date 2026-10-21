import { describe, expect, test } from "bun:test";
import { getSectionTarget } from "./section-scroll";

describe("staged reading boundaries", () => {
  test("scrolls upward from an aligned section", () => {
    expect(getSectionTarget([0, 900, 1800], [900, 900, 900], 900, 900, 1800, -1)).toBe(0);
  });
  test("returns from the footer's reachable bottom anchor", () => {
    expect(getSectionTarget([0, 900, 1800], [900, 900, 400], 1300, 900, 1300, -1)).toBe(900);
  });
  test("keeps tall content readable in both directions", () => {
    expect(getSectionTarget([0, 900, 2900], [900, 2000, 900], 1300, 900, 2900, -1)).toBeNull();
    expect(getSectionTarget([0, 900, 2900], [900, 2000, 900], 1300, 900, 2900, 1)).toBeNull();
  });
  test("lands on the last screen of a tall preceding section", () => {
    expect(getSectionTarget([0, 900, 2900], [900, 2000, 900], 2900, 900, 2900, -1)).toBe(2000);
  });
});