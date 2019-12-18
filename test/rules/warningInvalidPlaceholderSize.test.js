import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidPlaceholderSize";
import error from "../error";

describe("warningInvalidPlaceholderSize", () => {
  test("should return error when placeholder size is not allowed", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "xl" } }
  ]
}`;
    const expected = [error("WARNING.INVALID_PLACEHOLDER_SIZE", 4, 5, 4, 57)];

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
