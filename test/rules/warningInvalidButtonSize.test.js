import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidButtonSize";
import error from "../error";

describe("warningInvalidButtonSize", () => {
  test("should return error when button size not one step larger than text size", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonSizeWithErrors1.json", "utf8");
    const expected = [
      error("WARNING.INVALID_BUTTON_SIZE", 5, 7, 10, 8),
      error("WARNING.INVALID_BUTTON_SIZE", 28, 7, 33, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when button size not one step larger than text size on deep level", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonSizeWithErrors2.json", "utf8");
    const expected = [error("WARNING.INVALID_BUTTON_SIZE", 20, 9, 25, 10)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when text size is max", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonSizeWithErrors3.json", "utf8");
    const expected = [error("WARNING.INVALID_BUTTON_SIZE", 10, 5, 15, 6)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when button size one step larger than text size", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonSizeWithoutErrors1.json", "utf8");

    const result = linter(json, [rule]);

    expect(result).toHaveLength(0);
  });

  test("should return empty array when no buttons in warning block", () => {
    const json = fs.readFileSync("test/data/warningInvalidButtonSizeWithoutErrors2.json", "utf8");

    const result = linter(json, [rule]);

    expect(result).toHaveLength(0);
  });
});
