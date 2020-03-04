const bcrypt = require('bcrypt');
const jwtGen = require('./jwtGen');

const append = (strings, delimiter = ' ') => {
  return strings.map(str => str.trim()).join(delimiter);
};

const buildQuery = (table, select, conditions) => {
  const args = [];
  let query = 'SELECT';

  // handle what to select (e.g. SELECT [what])
  query = append([query, select === '*' ? '*' : select.join(', ')]);

  // handle table
  query = append([query, `FROM ${table}`]);

  if (!!conditions && Object.keys(conditions).length > 0) {
    query = append([query, 'WHERE']);
    Object.keys(conditions).forEach((key, i) => {
      query = append([query, `${i > 0 ? 'AND ' : ''}${key}=?`]);
      args.push(conditions[key] + '');
    });
  }
  return [query, args];
};

const passwordGen = (plaintext, callback) => {
  bcrypt.hash(plaintext, 10, (err, hash) => {
    if (err) throw err;
    callback(hash);
  });
};

const getHumanDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  const humanDate = `${year}-${month}-${day}-${hour}-${minutes}-${seconds}`;

  return humanDate;
};

module.exports = {
  append,
  buildQuery,
  passwordGen,
  jwtGen,
  jwtVerify: require('./jwtVerify'),
  buildFsTree: require('./buildFsTree'),
  pathExists: require('./pathExists'),
  getHumanDate
};
