const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Intentionally Synchronous
const privateKey = fs.readFileSync('./jwtPrivate.key', 'utf8');
const publicKey = fs.readFileSync('./jwtPublic.key', 'utf8');
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;
const expiresIn = process.env.JWT_EXPIRY;

const jwtGen = (payload, extraOptions = {}) => {
  const signOptions = {
    issuer,
    // subject: '',
    audience,
    expiresIn: !!extraOptions.expiry ? extraOptions.expiry : expiresIn,
    algorithm: 'RS256'
  };

  return jwt.sign(payload, privateKey, signOptions);
};

module.exports = jwtGen;
