import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "TEXT.SEVERAL_H1";
const text = "Заголовок первого уровня на странице должен быть единственным.";

export default report => {
  let found = false;
  return {
    enter: node => {
      if (getProperty(node, "block") === "text" && getProperty(node, "mods", "type") === "h1") {
        if (found) {
          report(error(code, text, node.loc));
        } else {
          found = true;
        }
      }
    },
    leave: undefined
  };
};
