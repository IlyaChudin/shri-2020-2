import fs from "fs";
import linter from "../../src/linter";
import rule from "../../src/rules/gridTooMuchMarketingBlocks";
import error from "../error";

describe("gridTooMuchMarketingBlocks", () => {
  test("should return error when marketing blocks take more than a half of grid columns", () => {
    const json = fs.readFileSync("test/data/gridTooMachMarketingBlocksWithErrors.json", "utf8");
    const expected = [error("GRID.TOO_MUCH_MARKETING_BLOCKS", 34, 3, 65, 4)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when marketing blocks take no more than a half of grid columns", () => {
    const json = fs.readFileSync("test/data/gridTooMachMarketingBlocksWithoutErrors.json", "utf8");

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
