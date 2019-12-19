import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "WARNING.INVALID_BUTTON_POSITION";
const text = "Блок button в блоке warning не может находиться перед блоком placeholder.";

export default report => {
  const scopes = [];
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      if (blockName === "warning" && !getProperty(node, "elem")) {
        scopes.push({ root: node, buttons: [] });
      } else if (scopes.length) {
        const { buttons } = scopes[scopes.length - 1];
        if (blockName === "button") {
          buttons.push(node);
        } else if (blockName === "placeholder") {
          buttons.forEach(x => {
            report(error(code, text, x.loc));
          });
          buttons.length = 0;
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
