import jsonToAst from "json-to-ast";
import traverse from "./traverse";

function parseJson(json) {
  try {
    return jsonToAst(json);
  } catch (error) {
    return undefined;
  }
}

export default (json, rules) => {
  const ast = parseJson(json);
  if (ast) {
    const errors = [];
    rules.forEach(rule => {
      traverse(
        ast,
        rule(error => {
          return errors.push(error);
        })
      );
    });

    return errors;
  }
  return undefined;
};
