process.chdir(__dirname + '/../');
const express = require('express');
const dotenv = require('dotenv');
const graphqlHttp = require('express-graphql');
const fs = require('fs');
const busboy = require('connect-busboy');
const authMiddleware = require('./authMiddleware');
const fileAuthMiddleware = require('./fileAuthMiddleware');
const rootQuery = require('./schemas/schema');
const login = require('./login');
const fileUpload = require('./fileUpload');
const getFiles = require('./getFiles');
const multer = require('multer');
const db = require('./db');
const bcrypt = require('bcrypt')

const {pathExists, jwtGen, getHumanDate} = require('./utils');
dotenv.config();

const app = express();
app.set('trust proxy', true);
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const userInfo = req.locals.userInfo;
    const fileInfo = req.locals.fileInfo;
    const targetDir =
      userInfo.pin + '/' + req.body.path + '/' + fileInfo.fileName;
    cb(null, targetDir);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const path = req.body.path;
    const userInfo = req.locals.userInfo;
    pathExists(path, userInfo.pin, (exists, parentID, curr) => {
      if (exists) {
        
        if(!!curr.find(v => v.name === file.originalname)){
          console.log('originalName', file.originalname);
          const fileNameArr = file.originalname.split('.');
          fileNameArr[fileNameArr.length-1] = `${getHumanDate()}.${fileNameArr[fileNameArr.length-1]}`;
          const fileNameExtended = fileNameArr.join('.');
          req.locals.fileInfo = {parentID, fileName: fileNameExtended};
        }else{
          req.locals.fileInfo = {parentID, fileName: file.originalname};
        }
        cb(null, exists);
      }
    });
  }
});

app.use(busboy());
app.use(express.json());
app.use(require('cors')());
app.use(
  '/graphql',
  authMiddleware,
  graphqlHttp({
    schema: rootQuery,
    graphiql: true
  })
);

// app.use();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/login', login);
app.post(
  '/files/cloud/folder',
  authMiddleware,
  require('./fileUpload/cloud/folder')
);

app.post(
  '/files/cloud/file',
  authMiddleware,
  upload.fields([{name: 'file'}, {name: 'path'}]),
  (req, res) => {
    const fileInfo = req.locals.fileInfo;
    const userInfo = req.locals.userInfo;
    db.query(
      'INSERT INTO `filesystems` (type, name, owner, parentID, status, timestamp) VALUES ("FILE", ?, ?, ?, "active", ?)',
      [fileInfo.fileName, userInfo.pin, fileInfo.parentID, Math.floor(Date.now() / 1000)],
      err => {
        if (err) throw err;
        res.send();
      }
    );
  }
);
app.get('/files', authMiddleware, getFiles);

app.post('/files/cloud/getToken', authMiddleware, (req, res) => {
  const path = req.body.path;
  const splitPath = path.split('/');
  const dirPath = splitPath.slice(0, -1).join('/');
  const fileName = splitPath.slice(-1);
  const userInfo = req.locals.userInfo;

  pathExists(dirPath, userInfo.pin, (exists, _) => {
    if (exists) {
      const filePath = `${userInfo.pin}/${dirPath}/${fileName}`;
      const shortToken = jwtGen({file: filePath}, {expiry: '2s'});
      res.send(shortToken);
    } else {
      res.sendStatus(400);
    }
  });
});

app.get('/files/cloud/download', fileAuthMiddleware, (req, res) => {
  const filePath = res.locals.filePath;
  res.download(`${uploadDir}/${filePath}`);
});

app.delete('/files/cloud/file', authMiddleware, (req, res) => {
  const path = req.body.path;
  const splitPath = path.split('/');
  const dirPath = splitPath.slice(0, -1).join('/');
  const fileName = splitPath.slice(-1)[0];
  const userInfo = req.locals.userInfo;

  pathExists(dirPath, userInfo.pin, (exists, _, curr) => {
    if (exists) {
      
      const normalizedFilename = fileName.startsWith('/')
      ? fileName.replace('/', '')
      : fileName;
      const dbFile = curr.find(v => v.name === normalizedFilename);
      db.query('UPDATE `filesystems` SET `status` = "deleted" WHERE `id`=?', [dbFile.id], err => {
        if(err) throw err;
        res.send('deleted' + dbFile.id);
      });
    } else {
      res.sendStatus(400);
    }
  });
});

app.put('/changePassword', authMiddleware, (req, res) => {
  const userInfo = res.locals.userInfo;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log('err', err)
    if(err) res.status(500).send();

    db.query('UPDATE `users` SET `password`=? WHERE `identifier`=?', [hash, userInfo.identifier], (err) => {
      if(err) res.status(500).send();
      res.send();
    })
  });
});

// Setup
const uploadDir = process.env.FILE_UPLOAD_DIR;
fs.access(uploadDir, err => {
  if (!!err && err.code === 'ENOENT') {
    console.log(`Directory ${uploadDir} doesn't exist. Creating..`);
    fs.mkdirSync(uploadDir);
  }

  app.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${port}`);
  });
});
