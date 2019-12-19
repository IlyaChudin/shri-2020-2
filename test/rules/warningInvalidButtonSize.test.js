import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidButtonSize";
import error from "../error";

describe("warningInvalidButtonSize", () => {
  test("should return error when button size not one step larger than text size", () => {
    const json = `[
  {
    "block": "warning",
    "content": [
      {
        "block": "button",
        "mods": {
          "size": "l"
        }
      },
      {
        "block": "text",
        "mods": {
          "size": "l"
        }
      }
    ]
  },
  {
    "block": "warning",
    "content": [
      {
        "block": "text",
        "mods": {
          "size": "m"
        }
      },
      {
        "block": "button",
        "mods": {
          "size": "xl"
        }
      },
      {
        "block": "button",
        "mods": {
          "size": "l"
        }
      }
    ]
  }
]
`;
    const expected = [
      error("WARNING.INVALID_BUTTON_SIZE", 5, 7, 10, 8),
      error("WARNING.INVALID_BUTTON_SIZE", 28, 7, 33, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when button size not one step larger than text size on deep level", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "xl"
          }
        }
      ]
    },
    {
      "block": "warning",
      "elem": "footer",
      "content": [
        {
          "block": "button",
          "mods": {
            "size": "s"
          }
        }
      ]
    }
  ]
}`;
    const expected = [error("WARNING.INVALID_BUTTON_SIZE", 20, 9, 25, 10)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when text size is max", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "text",
      "mods": {
        "size": "xxl"
      }
    },
    {
      "block": "button",
      "mods": {
        "size": "xxl"
      }
    }
  ]
}`;
    const expected = [error("WARNING.INVALID_BUTTON_SIZE", 10, 5, 15, 6)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when button size one step larger than text size", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "button",
      "mods": {
        "size": "xl"
      }
    },
    {
      "block": "text",
      "mods": {
        "size": "l"
      }
    },
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "button",
          "mods": {
            "size": "xl"
          }
        }
      ]
    }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
  test("should return empty array when no buttons in warning block", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "text",
      "mods": {
        "size": "l"
      }
    },
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "xl"
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
