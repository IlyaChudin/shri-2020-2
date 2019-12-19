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
      if (blockName === "warning" && !getProperty(node, "elem")) {
        scopes.push({ root: node, size: undefined, buttons: [] });
      } else if (blockName === "text" && scopes.length) {
        const textSize = getProperty(node, "mods", "size");
        if (textSize) {
          const scope = scopes[scopes.length - 1];
          if (!scope.size) {
            scope.size = textSize;
          }
        }
      } else if (blockName === "button" && scopes.length) {
        const scope = scopes[scopes.length - 1];
        scope.buttons.push(node);
      }
    },
    leave: node => {
      if (scopes.length) {
        const { root, size, buttons } = scopes[scopes.length - 1];
        if (node === root) {
          if (size && buttons.length) {
            buttons.forEach(x => {
              const buttonSize = getProperty(x, "mods", "size");
              if (buttonSize) {
                if (size === sizes[sizes.length - 1] || buttonSize !== sizes[sizes.indexOf(size) + 1]) {
                  report(error(code, text, x.loc));
                }
              }
            });
          }
          scopes.pop();
        }
      }
    }
  };
};
