import linter from "../../src/linter";
import rule from "../../src/rules/warningInvalidButtonPosition";
import error from "../error";

describe("warningInvalidButtonPosition", () => {
  test("should return error when button appears before placeholder", () => {
    const json = `[
  {
    "block": "warning",
    "content": [
      {
        "block": "button"
      },
      {
        "block": "placeholder"
      },
      {
        "block": "button"
      }
    ]
  },
  {
    "block": "warning",
    "content": [
      {
        "block": "button"
      },
      {
        "block": "placeholder"
      },
      {
        "block": "button"
      }
    ]
  }
]
`;
    const expected = [
      error("WARNING.INVALID_BUTTON_POSITION", 5, 7, 7, 8),
      error("WARNING.INVALID_BUTTON_POSITION", 19, 7, 21, 8)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return error when button appears before placeholder on deep level", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "button"
        }
      ]
    },
    {
      "block": "warning",
      "elem": "footer",
      "content": [
        {
          "block": "placeholder"
        }
      ]
    }
  ]
}`;
    const expected = [error("WARNING.INVALID_BUTTON_POSITION", 8, 9, 10, 10)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when button not appears before placeholder", () => {
    const json = `{
  "block": "warning",
  "content": [
    {
      "block": "placeholder"
    },
    {
      "block": "warning",
      "elem": "content",
      "content": [
        {
          "block": "placeholder"
        }
      ]
    },
    {
      "block": "warning",
      "elem": "footer",
      "content": [
        {
          "block": "button"
        }
      ]
    }
  ]
}`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
