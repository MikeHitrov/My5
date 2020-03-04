const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

const publicKey = fs.readFileSync('./jwtPublic.key', 'utf8');

const jwtVerify = (session, cb) => {
  jwt.verify(session, publicKey, {audience, issuer}, cb);
};

module.exports = jwtVerify;
