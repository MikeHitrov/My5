const {pathExists} = require('../../utils');
require('dotenv').config();

const uploadDir = process.env.FILE_UPLOAD_DIR;

const downloadFile = (req, res) => {
  const userInfo = res.locals.userInfo;
  const path = req.query.path;
  if(!path){
    res.send(400);
    return;
  }
  const splitPath = path.split('/');
  const dirPath = splitPath.slice(0, -1).join('/');
  const fileName = splitPath.slice(-1);

  if(path.length === 0 || !path.startsWith('/')){
    res.send(400);
    return;
  }
  pathExists(dirPath, userInfo.pin, (exists, _) => {
    if(exists){
      res.download(`${uploadDir}/${userInfo.pin}/${dirPath}/${fileName}`)
    }else{
      res.send(':(')
    }
  })
}

module.exports = downloadFile;