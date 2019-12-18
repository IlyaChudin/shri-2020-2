import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "WARNING.INVALID_BUTTON_SIZE";
const text = "Размер кнопки блока warning должен быть на 1 шаг больше эталонного.";
const sizes = ["s", "m", "l", "xl", "xxl"];

export default report => {
  const scopes = [];
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      if (blockName === "warning") {
        scopes.push({ root: node, size: undefined });
      } else if (blockName === "text" && scopes.length) {
        const textSize = getProperty(node, "mods", "size");
        if (textSize) {
          const scope = scopes[scopes.length - 1];
          if (!scope.size) {
            scope.size = textSize;
          }
        }
      } else if (blockName === "button" && scopes.length) {
        const buttonSize = getProperty(node, "mods", "size");
        if (buttonSize) {
          const scope = scopes[scopes.length - 1];
          if (scope.size === sizes[sizes.length - 1] || buttonSize !== sizes[sizes.indexOf(scope.size) + 1]) {
            report(error(code, text, node.loc));
          }
        }
      }
    },
    leave: node => {
      const { root } = scopes[scopes.length - 1];
      if (node === root) {
        scopes.pop();
      }
    }
  };
};
