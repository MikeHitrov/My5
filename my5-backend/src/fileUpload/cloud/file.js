const meter = require('stream-meter');
const fs = require('fs');
const db = require('../../db');
const {buildFsTree} = require('../../utils');
require('dotenv').config();

const uploadDir = process.env.FILE_UPLOAD_DIR;

const file = (req, res) => {
  const userInfo = res.locals.userInfo;
  const path = req.body.path;
  db.query(
    'SELECT * FROM `filesystems` WHERE `owner`=? AND `status`="active"',
    [userInfo.pin],
    (err, dbRes) => {
      if (err) throw err;
      const tree = buildFsTree(dbRes);

      const [, ...trimmedPath] = path.split('/');
      let curr = tree.root;
      let exists = true;
      let parentID = tree.rootID;

      for (let i = 0; i < trimmedPath.length && exists === true; i++) {
        const child = curr.find(f => f.name === trimmedPath[i]);
        if (!!child) {
          parentID = child.id;
          curr = child.children;
        } else {
          exists = false;
        }
      }

      if (!exists) {
        res.sendStatus(400);
        return;
      }
    }
  );
};

module.exports = file;
