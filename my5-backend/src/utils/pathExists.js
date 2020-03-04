const db = require('../db');
const buildFsTree = require('../utils/buildFsTree');

const pathExists = (path, owner, cb) => {
  db.query(
    'SELECT * FROM `filesystems` WHERE `owner`=? AND `status`="active"',
    [owner],
    (err, dbRes) => {
      if (err) throw err;
      const tree = buildFsTree(dbRes);

      const [, ...trimmedPath] = path.split('/');
      let curr = tree.root;
      let exists = true;
      let parentID = tree.rootID;
      if (path !== '/') {
        for (let i = 0; i < trimmedPath.length && exists === true; i++) {
          const child = curr.find(f => f.name === trimmedPath[i]);
          if (!!child) {
            parentID = child.id;
            curr = child.children;
          } else {
            exists = false;
          }
        }
      }

      cb(exists, parentID, curr);
    }
  );
};

module.exports = pathExists;
