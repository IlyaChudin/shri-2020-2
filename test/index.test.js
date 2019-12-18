import lint from "../src";

describe("lint", () => {
  test("should return empty array when passed invalid json", () => {
    const json = `{"node:5}`;

    const result = lint(json);

    expect(result.length).toBe(0);
  });

  test("should return empty array when passed json with no affected blocks", () => {
    const json = `{
  "key1": [true, false, null],
  "key2": {
    "key3": [1, 2, "3", 1e10, 1e-3]
  }
}`;

    const result = lint(json);

    expect(result.length).toBe(0);
  });
});
