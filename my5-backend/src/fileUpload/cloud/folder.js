const fs = require('fs');
const db = require('../../db');
const {buildFsTree} = require('../../utils');

const uploadDir = process.env.FILE_UPLOAD_DIR;

const folder = (req, res) => {
  const userInfo = res.locals.userInfo;
  const {path, name} = req.body;
  if (!path.startsWith('/')) {
    res.sendStatus(400);
    return;
  }
  db.query(
    'SELECT * FROM `filesystems` WHERE `owner`=? AND `status`="active"',
    [userInfo.pin],
    (err, dbRes) => {
      if (err) throw err;
      const tree = buildFsTree(dbRes);

      // check if folder exists
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

      if (!exists) {
        res.sendStatus(400);
        return;
      }

      // check if folder already exists
      if (!curr.find(f => f.name === name)) {
        // create new folder
        const userDir = uploadDir + '/' + userInfo.pin;
        fs.mkdir(userDir + path + '/' + name, {recursive: true}, err => {
          if (err) throw err;
          db.query(
            'INSERT INTO `filesystems` (type, parentID, name, owner, status, timestamp) VALUES ("DIR",?,?,?, "active", ?)',
            [parentID, name, userInfo.pin, Math.floor(Date.now() / 1000)],
            err => {
              if (err) throw err;
              res.send();
            }
          );
        });
      } else {
        res.send();
      }
    }
  );
};

module.exports = folder;
