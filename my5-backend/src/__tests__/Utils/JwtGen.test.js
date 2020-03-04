const jwt = require('jsonwebtoken');
const fs = require('fs');
const {jwtGen} = require('../../utils');

const publicKey = fs.readFileSync('./jwtPublic.key');

describe('query with no conditions', () => {
  it('generate jwt', done => {
    const generated = jwtGen({identifier: '5', type: 'student'});
    jwt.verify(generated, publicKey, (err, decoded) => {
      expect(decoded.identifier).toBe('5');
      expect(decoded.type).toBe('student');
      done();
    })
  })
})
