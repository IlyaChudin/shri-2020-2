import { getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "GRID.TOO_MUCH_MARKETING_BLOCKS";
const text = "Маркетинговые блоки занимают больше половины от всех колонок блока grid.";
const marketingBlocks = ["commercial", "offer"];

export default report => {
  const scopes = [];
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      const elemName = getProperty(node, "elem");
      if (blockName === "grid") {
        if (!elemName) {
          const size = getProperty(node, "mods", "m-columns");
          scopes.push({ root: node, size, fractionSize: 0, marketingColumnsCount: 0 });
        } else if (elemName === "fraction" && scopes.length) {
          const fractionSize = getProperty(node, "elemMods", "m-col");
          const scope = scopes[scopes.length - 1];
          scope.fractionSize = Number(fractionSize);
        }
      } else if (marketingBlocks.includes(blockName) && !elemName && scopes.length) {
        const scope = scopes[scopes.length - 1];
        scope.marketingColumnsCount += scope.fractionSize;
      }
    },
    leave: node => {
      if (scopes.length) {
        const { root, size, marketingColumnsCount } = scopes[scopes.length - 1];
        if (node === root) {
          if (marketingColumnsCount > size * 0.5) {
            report(error(code, text, root.loc));
          }
          scopes.pop();
        }
      }
    }
  };
};
