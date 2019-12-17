import linter from "../src/linter";

describe("linter", () => {
  test("should return empty array when passed invalid json", () => {
    const json = `{"node:5}`;

    const result = linter(json, []);

    expect(result.length).toBe(0);
  });
});
