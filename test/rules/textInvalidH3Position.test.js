import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/textInvalidH3Position";
import error from "../error";

describe("textInvalidH3Position", () => {
  test("should return error when h3 appears before h2", () => {
    const json = fs.readFileSync("test/data/textInvalidH3PositionWithErrors.json", "utf8");
    const expected = [
      error("TEXT.INVALID_H3_POSITION", 5, 7, 10, 8),
      error("TEXT.INVALID_H3_POSITION", 57, 7, 62, 8),
      error("TEXT.INVALID_H3_POSITION", 48, 3, 53, 4),
      error("TEXT.INVALID_H3_POSITION", 81, 7, 86, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when h3 not appears before h2", () => {
    const json = fs.readFileSync("test/data/textInvalidH3PositionWithoutErrors.json", "utf8");

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
