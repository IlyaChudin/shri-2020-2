import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/textInvalidH2Position";
import error from "../error";

describe("textInvalidH2Position", () => {
  test("should return error when h2 appears before h1", () => {
    const json = fs.readFileSync("test/data/textInvalidH2PositionWithErrors.json", "utf8");
    const expected = [
      error("TEXT.INVALID_H2_POSITION", 5, 7, 10, 8),
      error("TEXT.INVALID_H2_POSITION", 57, 7, 62, 8),
      error("TEXT.INVALID_H2_POSITION", 48, 3, 53, 4),
      error("TEXT.INVALID_H2_POSITION", 81, 7, 86, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when h2 not appears before h1", () => {
    const json = fs.readFileSync("test/data/textInvalidH2PositionWithoutErrors.json", "utf8");

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
