import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidPlaceholderSize";
import error from "../error";

describe("warningInvalidPlaceholderSize", () => {
  test("should return error when placeholder size is not allowed", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "placeholder",
      "mods": {
        "size": "xl"
      }
    },
    {
      "block": "placeholder",
      "mods": {
        "size": "xxl"
      }
    },
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "xl"
          }
        }
      ]
    },
    {
      "block": "test",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "xs"
          }
        }
      ]
    }
  ]
}`;
    const expected = [
      error("WARNING.INVALID_PLACEHOLDER_SIZE", 4, 5, 9, 6),
      error("WARNING.INVALID_PLACEHOLDER_SIZE", 10, 5, 15, 6),
      error("WARNING.INVALID_PLACEHOLDER_SIZE", 20, 9, 25, 10),
      error("WARNING.INVALID_PLACEHOLDER_SIZE", 31, 9, 36, 10)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when placeholder size is allowed", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "placeholder",
      "mods": {
        "size": "s"
      }
    },
    {
      "block": "placeholder",
      "mods": {
        "size": "m"
      }
    },
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "m"
          }
        }
      ]
    },
    {
      "block": "test",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "l"
          }
        }
      ]
    }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
