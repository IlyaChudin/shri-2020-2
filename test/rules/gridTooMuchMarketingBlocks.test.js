import linter from "../../src/linter";
import rule from "../../src/rules/gridTooMuchMarketingBlocks";
import error from "../error";

describe("grid-too-much-marketing-blocks", () => {
  test("should return error when ", () => {
    const json = `{
  "block": "grid",
  "mods": {
    "m-columns": "10"
  },
  "content": [
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "2"
      },
      "content": [
        {
          "block": "payment"
        }
      ]
    },
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "8"
      },
      "content": [
        {
          "block": "offer"
        }
      ]
    }
  ]
}`;
    const expected = [error("GRID.TOO_MUCH_MARKETING_BLOCKS", 1, 1, 32, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when ", () => {
    const json = `{
  "block": "grid",
  "mods": {
    "m-columns": "10"
  },
  "content": [
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "8"
      },
      "content": [
        {
          "block": "payment"
        }
      ]
    },
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "2"
      },
      "content": [
        {
          "block": "offer"
        }
      ]
    }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
