import linter from "../src/linter";

describe("linter", () => {
  test("should return undefined when passed invalid json", () => {
    const json = `{"node:5}`;

    const result = linter(json, []);

    expect(result).toBe(undefined);
  });
});
