const buildFsTree = arr => {
  const root = arr.find(f => f.parentID === null);
  return {root: buildChildren(root, arr), 
    ...(!!root && {rootID: root.id})
  };
};

const buildChildren = (root, arr) => {
  return arr
    .filter(f => f.parentID === root.id)
    .map(f => {
      if (f.type === 'FILE') {
        return shapeFile(f);
      } else if (f.type === 'DIR') {
        return {
          id: f.id,
          name: f.name,
          type: f.type,
          children: buildChildren(f, arr)
        };
      }
    });
};

const shapeFile = file => ({
  name: file.name,
  size: file.size,
  type: file.type,
  id: file.id
});

module.exports = buildFsTree;
