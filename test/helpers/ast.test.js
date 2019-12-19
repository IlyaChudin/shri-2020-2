import jsonToAst from "json-to-ast";
import { getProperty } from "../../src/helpers/ast";

describe("getProperty", () => {
  test("should return first level property", () => {
    const json = `{ "block": "text", "mods": { "type": "h1" } }`;

    const result = getProperty(jsonToAst(json), "block");

    expect(result).toBe("text");
  });

  test("should return second level property", () => {
    const json = `{ "block": "text", "mods": { "type": "h1" } }`;

    const result = getProperty(jsonToAst(json), "mods", "type");

    expect(result).toBe("h1");
  });

  test("should return third level property", () => {
    const json = `{ "block": "text", "mods": { "type": { "size": "m" } } }`;

    const result = getProperty(jsonToAst(json), "mods", "type", "size");

    expect(result).toBe("m");
  });

  test("should return undefined when property not found", () => {
    const json = `{ "block": "text", "mods": { "type": "h1" } }`;

    const result = getProperty(jsonToAst(json), "mods", "size");

    expect(result).toBe(undefined);
  });

  test("should return undefined when node is not Object", () => {
    const json = `{ "block": "text", "mods": [{ "type": "h1" }] }`;

    const result = getProperty(jsonToAst(json), "mods", "type");

    expect(result).toBe(undefined);
  });
});
