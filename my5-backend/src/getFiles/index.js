const fs = require('fs');
const db = require('../db');
const {buildFsTree} = require('../utils');
require('dotenv').config();

const uploadDir = process.env.FILE_UPLOAD_DIR;

const getFiles = (req, res) => {
  const userInfo = res.locals.userInfo;

  db.query(
    'SELECT * FROM `filesystems` WHERE `owner`=? AND `status`="active"',
    [userInfo.pin],
    (err, dbRes) => {
      if (err) throw err;
      const tree = buildFsTree(dbRes);
      if (dbRes.length > 0) {
        res.send(tree);
      } else {
        // create root entry
        fs.mkdir(`${uploadDir}/${userInfo.pin}`, err => {
          if (err) throw err;
          db.query(
            'INSERT INTO `filesystems` (type, parentID, owner, status) VALUES ("DIR", NULL, ?, "active")',
            [userInfo.pin],
            err => {
              if (err) throw err;
              res.send(tree);
            }
          );
        });
      }
    }
  );
};

module.exports = getFiles;
