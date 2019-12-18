import linter from "../../src/linter";
import rule from "../../src/rules/text-invalid-h2-position";
import error from "../error";

describe("text-invalid-h2-position", () => {
  test("should return error when h2 appears before h1", () => {
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
          "type": "h1"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h2"
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
          "type": "h1"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
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
              "type": "h1"
            }
          }
        ]
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  }
]`;
    const expected = [
      error("TEXT.INVALID_H2_POSITION", 5, 7, 10, 7),
      error("TEXT.INVALID_H2_POSITION", 57, 7, 62, 7),
      error("TEXT.INVALID_H2_POSITION", 48, 3, 53, 3)
    ];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when h2 not appears before h1", () => {
    const json = `[
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h1"
        }
      },
      {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      }
    ]
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "test",
    "content": [
      {
        "block": "text",
        "mods": {
          "type": "h1"
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
  }
]`;
    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
