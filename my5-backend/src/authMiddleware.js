const {jwtVerify} = require('./utils');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const session = req.headers['x-session-id'];
  if (!!session) {
    jwtVerify(session, (err, decoded) => {
      if (err) {
        res.status(401).send('');
      } else {
        const {identifier, type, pin} = decoded;
        res.locals = {...res.locals, userInfo: {identifier, type, pin}};
        req.locals = {...res.locals, userInfo: {identifier, type, pin}};
        next();
      }
    });
  } else {
    res.status(401).send('');
  }
};

module.exports = authMiddleware;
