import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidButtonPosition";
import error from "../error";

describe("warningInvalidButtonPosition", () => {
  test("should return error when button appears before placeholder", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonPositionWithErrors1.json", "utf8");
    const expected = [
      error("WARNING.INVALID_BUTTON_POSITION", 5, 7, 7, 8),
      error("WARNING.INVALID_BUTTON_POSITION", 19, 7, 21, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when button appears before placeholder on deep level", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonPositionWithErrors2.json", "utf8");
    const expected = [error("WARNING.INVALID_BUTTON_POSITION", 8, 9, 10, 10)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when button not appears before placeholder", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonPositionWithoutErrors.json", "utf8");

    const result = linter(json, [rule]);

    expect(result).toHaveLength(0);
  });
});
