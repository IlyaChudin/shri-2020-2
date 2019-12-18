// eslint-disable-next-line import/prefer-default-export
export function getProperty(node, ...keys) {
  let object = node;
  for (let i = 0; i < keys.length; i += 1) {
    if (object.type !== "Object") {
      return undefined;
    }
    const key = keys[i];
    const prop = object.children.find(x => x.key.value === key);
    if (prop === undefined) {
      return undefined;
    }
    object = prop.value;
  }
  return object.value;
}
