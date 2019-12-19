import linter from "../../src/linter";
import rule from "../../src/rules/warningTextSizesShouldBeEqual";
import error from "../error";

describe("warningTextSizesShouldBeEqual", () => {
  test("should return only one error when rule violates several times per block", () => {
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
      "block": "text",
      "mods": {
        "size": "s"
      }
    },
    {
      "block": "warning",
      "elem" : "content",
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
      "block": "test",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 40, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should not create new scope for block elements", () => {
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
      "elem" : "content",
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
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 23, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should not create new scope for another blocks", () => {
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
      "block": "test",
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
    const expected = [error("WARNING.TEXT_SIZES_SHOULD_BE_EQUAL", 1, 1, 22, 2)];

    const result = linter(json, [rule]);

    expect(result).toMatchObject(expected);
  });

  test("should return empty array when text sizes are equal", () => {
    const json = `{
  "block": "warning",
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
        "size": "l"
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
      "elem" : "content",
      "content": [
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
