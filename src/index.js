import linter from "./linter";
import rules from "./rules";

export default json => {
  return linter(json, rules) || [];
};
