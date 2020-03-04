const {jwtVerify} = require('./utils');
const dotenv = require('dotenv');
dotenv.config();

const fileAuthMiddleware = (req, res, next) => {
  const session = req.query.token;
  if (!!session) {
    jwtVerify(session, (err, decoded) => {
      if (err) {
        console.log('error', err)
        res.status(401).send('');
      } else {
        const {file} = decoded;
        res.locals = {...res.locals, filePath: file};
        next();
      }
    });
  } else {
    console.log('error rejem')
    res.status(401).send('');
  }
};

module.exports = fileAuthMiddleware;