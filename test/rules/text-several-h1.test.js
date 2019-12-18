import linter from "../../src/linter";
import rule from "../../src/rules/text-several-h1";
import error from "../error";

describe("text-several-h1", () => {
  test("should return error when more than one h1 on page", () => {
    const json = `[
  {
    "block": "text",
    "mods": { "type": "h1" }
  },
  {
    "block": "text",
    "mods": { "type": "h2" }
  },
  {
    "block": "text",
    "content": {
      "block": "text",
      "mods": { "type": "h1" }
    }
  }
]`;
    const expected = [error("TEXT.SEVERAL_H1", 12, 16, 15, 5)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when only one h1 on page", () => {
    const json = `[
  {
    "block": "text",
    "mods": { "type": "h1" }
  },
  {
    "block": "text",
    "mods": { "type": "h2" }
  },
  {
    "block": "text",
    "content": {
      "block": "text",
      "mods": { "type": "h3" }
    }
  }
]`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
