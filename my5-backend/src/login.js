const db = require("./db");
const bcrypt = require("bcrypt");
const { jwtGen } = require("./utils");

module.exports = (req, res) => {
  console.log('-1')
  const { identifier, password } = req.body;
  console.log('0')

  db.query(
    "SELECT * FROM users WHERE `identifier`=?",
    [identifier],
    (err, sqlRes) => {
      console.log('1')
      if (err) throw err;
      console.log('2')
      const user = sqlRes[0];
      if (!!user) {
        console.log('3')

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userPassword = user.password;
        bcrypt.compare(password, userPassword, (err, valid) => {
      console.log('4')

          if (err) throw err;
      console.log('5')
         
          db.query('INSERT INTO `log` (type, timestamp, meta, ip) VALUES ("login", ?, ?, ?)', [Math.floor(Date.now() / 1000), user.PIN, ip], err => {
            if (err) throw err;
            const jwt = jwtGen({ pin: user.PIN, identifier: user.identifier, type: user.type });
            valid ? res.send(jwt) : res.status(401).send();
          });
        });
      } else {
        res.status(401).send();
      }
    }
  );
};
