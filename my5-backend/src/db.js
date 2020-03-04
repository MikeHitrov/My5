const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  connectTimeout: 20,
  connectionLimit: 8,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ...(!!process.env.DB_SOCKET_PATH && {socketPath: process.env.DB_SOCKET_PATH})
});

module.exports = {
  query: function () {
    const queryArgs = Array.prototype.slice.call(arguments),
        events = [],
        eventNameIndex = {};

    pool.getConnection((err, conn) => {
        if (err) {
            if (eventNameIndex.error) {
                eventNameIndex.error();
            }
        }

        if (conn) { 
            const q = conn.query.apply(conn, queryArgs);
            q.on('end', () => {
                conn.release();
            });

            events.forEach((args) => {
                q.on.apply(q, args);
            });
        }
    });

    return {
        on: (eventName, callback) => {
            events.push(Array.prototype.slice.call(arguments));
            eventNameIndex[eventName] = callback;
            return this;
        }
    };
  }
};