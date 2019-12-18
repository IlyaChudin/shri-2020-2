import linter from "../../src/linter";
import rule from "../../src/rules/text-invalid-h3-position";
import error from "../error";

describe("text-invalid-h3-position", () => {
  test("should return error when h3 appears before h2", () => {
    const json = `[
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h3"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h3"
        }
      }
    ]
  },
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h3"
        }
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h3"
    }
  },
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h3"
        }
      },
      {
        "block": "test",
        "elem": "deep",
        "content": [
          {
            "block": "text",
            "mods": {
              "type": "h2"
            }
          }
        ]
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  }
]`;
    const expected = [
      error("TEXT.INVALID_H3_POSITION", 5, 7, 10, 7),
      error("TEXT.INVALID_H3_POSITION", 57, 7, 62, 7),
      error("TEXT.INVALID_H3_POSITION", 48, 3, 53, 3)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when h3 not appears before h2", () => {
    const json = `[
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h3"
        }
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h3"
    }
  },
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      },
      {
        "block": "test",
        "elem": "deep",
        "content": [
          {
            "block": "text",
            "mods": {
              "type": "h3"
            }
          }
        ]
      }
    ]
  }
]`;
    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
