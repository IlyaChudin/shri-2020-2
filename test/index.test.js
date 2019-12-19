import fs from "fs";
import lint from "../src";
import error from "./error";

describe("lint", () => {
  test("should return empty array when passed invalid json", () => {
    const json = `{"node:5}`;

    const result = lint(json);

    expect(result).toHaveLength(0);
  });

  test("should return empty array when passed json with no affected blocks", () => {
    const json = `{ "key1": [true, false, null], "key2": { "key3": [1, 2, "3", 1e10, 1e-3] } }`;

    const result = lint(json);

    expect(result).toHaveLength(0);
  });

  test("should return empty array when passed bemjson without lint errors", () => {
    const json = fs.readFileSync("test/data/complexWithoutErrors.json", "utf8");

    const result = lint(json);

    expect(result).toHaveLength(0);
  });

  test("should return empty array when passed bemjson with lint errors", () => {
    const json = fs.readFileSync("test/data/complexWithErrors.json", "utf8");
    const expected = [
      error("TEXT.SEVERAL_H1", 258, 29, 272, 30),
      error("WARNING.INVALID_BUTTON_SIZE", 205, 29, 210, 30),
      error("GRID.TOO_MUCH_MARKETING_BLOCKS", 61, 13, 448, 14)
    ];

    const result = lint(json);

    expect(result).toMatchObject(expected);
  });
});
