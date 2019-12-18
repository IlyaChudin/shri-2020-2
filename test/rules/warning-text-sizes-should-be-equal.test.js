import linter from "../../src/linter";
import rule from "../../src/rules/warning-text-sizes-should-be-equal";
import error from "../error";

describe("warning-text-sizes-should-be-equal", () => {
  test("should return error when text sizes are not equal", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "text", "mods": { "size": "l" } },
    { "block": "text", "mods": { "size": "m" } }
  ]
}`;
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 7, 1)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when text sizes are equal", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "text", "mods": { "size": "l" } },
    { "block": "text", "mods": { "size": "l" } }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
