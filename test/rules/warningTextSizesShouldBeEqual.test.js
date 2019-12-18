import linter from "../../src/linter";
import rule from "../../src/rules/warningTextSizesShouldBeEqual";
import error from "../error";

describe("warningTextSizesShouldBeEqual", () => {
  test("should return error when text sizes are not equal", () => {
    const json = `{
  "block": "warning",
  "content": [
    { "block": "text", "mods": { "size": "l" } },
    { "block": "text", "mods": { "size": "m" } }
  ]
}`;
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 7, 2)];

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
