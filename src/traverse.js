import traverseProps from "./traverseProps";

export default function traverse(node, visitor) {
  if (visitor.enter) {
    visitor.enter(node);
  }

  const props = traverseProps[node.type];
  if (props) {
    props.forEach(p => {
      const child = node[p];
      if (Array.isArray(child)) {
        child.forEach(c => traverse(c, visitor));
      } else {
        traverse(child, visitor);
      }
    });
  }

  if (visitor.leave) {
    visitor.leave(node);
  }
}
