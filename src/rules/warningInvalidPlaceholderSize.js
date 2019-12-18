import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "WARNING.INVALID_PLACEHOLDER_SIZE";
const text = "Допустимые размеры для блока placeholder в блоке warning: s, m, l.";
const sizes = ["s", "m", "l"];

export default report => {
  const scopes = [];
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      if (blockName === "warning") {
        scopes.push({ root: node });
      } else if (blockName === "placeholder" && scopes.length) {
        const size = getProperty(node, "mods", "size");
        if (size && !sizes.includes(size)) {
          report(error(code, text, node.loc));
        }
      }
    },
    leave: node => {
      if (scopes.length) {
        const { root } = scopes[scopes.length - 1];
        if (node === root) {
          scopes.pop();
        }
      }
    }
  };
};
