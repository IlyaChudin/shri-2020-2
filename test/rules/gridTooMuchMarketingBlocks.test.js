import linter from "../../src/linter";
import rule from "../../src/rules/gridTooMuchMarketingBlocks";
import error from "../error";

describe("gridTooMuchMarketingBlocks", () => {
  test("should return error when marketing blocks take more than a half of grid columns", () => {
    const json = `[
  {
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
  },
  {
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
  },
  {
    "block": "grid",
    "mods": {
      "m-columns": "10"
    },
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "6"
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
          "m-col": "4"
        },
        "content": [
          {
            "block": "warning"
          }
        ]
      }
    ]
  }
]`;
    const expected = [error("GRID.TOO_MUCH_MARKETING_BLOCKS", 34, 3, 65, 4)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when marketing blocks take no more than a half of grid columns", () => {
    const json = `[
  {
    "block": "grid",
    "mods": {
      "m-columns": "10"
    },
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "5"
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
          "m-col": "5"
        },
        "content": [
          {
            "block": "offer"
          }
        ]
      }
    ]
  },
  {
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
  }
]`;

    const result = linter(json, [rule]);

    expect(result.length).toBe(0);
  });
});
