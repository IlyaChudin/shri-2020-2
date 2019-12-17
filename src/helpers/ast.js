export function getProperty(node, key) {
  if (node.type === "Object") {
    const prop = node.children.find(x => x.key.value === key);
    if (prop) {
      return prop.value.value;
    }
  }
  return undefined;
}

export function getMod(node, key) {
  if (node.type === "Object") {
    const mods = node.children.find(x => x.key.value === "mods");
    if (mods && mods.value && mods.value.children) {
      const mod = mods.value.children.find(x => x.key.value === key);
      if (mod) {
        return mod.value.value;
      }
    }
  }
  return undefined;
}

export function getElemMod(node, key) {
  if (node.type === "Object") {
    const mods = node.children.find(x => x.key.value === "elemMods");
    if (mods && mods.value && mods.value.children) {
      const mod = mods.value.children.find(x => x.key.value === key);
      if (mod) {
        return mod.value.value;
      }
    }
  }
  return undefined;
}
