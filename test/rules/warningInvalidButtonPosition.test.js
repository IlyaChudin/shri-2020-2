import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidButtonPosition";
import error from "../error";

describe("warningInvalidButtonPosition", () => {
  test("should return error when button appears before placeholder", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "button", "mods": { "size": "m" } },
    { "block": "placeholder", "mods": { "size": "m" } }
  ]
}`;
    const expected = [error("WARNING.INVALID_BUTTON_POSITION", 4, 5, 4, 51)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when button not appears before placeholder", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "m" } },
    { "block": "button", "mods": { "size": "m" } }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
