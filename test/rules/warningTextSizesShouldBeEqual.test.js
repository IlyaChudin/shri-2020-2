import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/warningTextSizesShouldBeEqual";
import error from "../error";

describe("warningTextSizesShouldBeEqual", () => {
  test("should return only one error when rule violates several times per block", () => {
    const json = fs.readFileSync("test/data/warningTextSizesShouldBeEqualWithErrors1.json", "utf8");
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 40, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should not create new scope for block elements", () => {
    const json = fs.readFileSync("test/data/warningTextSizesShouldBeEqualWithErrors2.json", "utf8");
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 23, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should not create new scope for another blocks", () => {
    const json = fs.readFileSync("test/data/warningTextSizesShouldBeEqualWithErrors3.json", "utf8");
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 22, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when text sizes are equal", () => {
    const json = fs.readFileSync("test/data/warningTextSizesShouldBeEqualWithoutErrors.json", "utf8");

    const result = linter(json, [rule]);

    expect(result).toHaveLength(0);
  });
});
