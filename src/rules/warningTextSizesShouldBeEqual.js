import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL";
const text = "Все тексты в блоке warning должны быть одного размера.";

export default report => {
  const scopes = [];
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      if (blockName === "warning" && !getProperty(node, "elem")) {
        scopes.push({ root: node, size: undefined, haveErrors: false });
      } else if (blockName === "text" && scopes.length) {
        const mod = getProperty(node, "mods", "size");
        if (mod) {
          const scope = scopes[scopes.length - 1];
          if (!scope.size) {
            scope.size = mod;
          } else if (mod !== scope.size) {
            scope.haveErrors = true;
          }
        }
      }
    },
    leave: node => {
      if (scopes.length) {
        const { root, haveErrors } = scopes[scopes.length - 1];
        if (node === root) {
          if (haveErrors) {
            report(error(code, text, root.loc));
          }
          scopes.pop();
        }
      }
    }
  };
};
