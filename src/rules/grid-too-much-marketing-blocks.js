import { getElemMod, getMod, getProperty } from "../helpers/ast";
import error from "../helpers/error";

const code = "GRID.TOO_MUCH_MARKETING_BLOCKS";
const text = "Маркетинговые блоки занимают больше половины от всех колонок блока grid.";
const marketingBlocks = ["commercial", "offer"];

export default report => {
  const scopes = [];
  let marketingColumnsCount = 0;
  return {
    enter: node => {
      const blockName = getProperty(node, "block");
      const elemName = getProperty(node, "elem");
      if (blockName === "grid") {
        if (!elemName) {
          const size = getMod(node, "m-columns");
          scopes.push({ root: node, size, fractionSize: 0 });
        } else if (elemName === "fraction" && scopes.length) {
          const size = getElemMod(node, "m-col");
          const scope = scopes[scopes.length - 1];
          scope.fractionSize = Number(size);
        }
      } else if (marketingBlocks.includes(blockName) && !elemName && scopes.length) {
        const scope = scopes[scopes.length - 1];
        marketingColumnsCount += scope.fractionSize;
      }
    },
    leave: node => {
      const { root, size } = scopes[scopes.length - 1];
      if (node === root) {
        if (marketingColumnsCount >= size * 0.5) {
          report(error(code, text, root.loc));
        }
        scopes.pop();
      }
    }
  };
};
