import linter from "../../src/linter";
import rule from "../../src/rules/warning-invalid-placeholder-size";
import error from "../error";

describe("warning-invalid-placeholder-size", () => {
  test("should return error when placeholder size is not allowed", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "xl" } }
  ]
}`;
    const expected = [error("WARNING.INVALID_PLACEHOLDER_SIZE", 4, 5, 4, 56)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when placeholder size is allowed", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "m" } }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
