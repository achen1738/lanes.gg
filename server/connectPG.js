const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const connect = async () => {
  // Connect to server on localhost
  const mySession = await mysqlx.getSession({
    host: 'localhost',
    port: 33060,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS
  });
  await mySession.sql(`USE ${process.env.MYSQL_DB}`).execute();
  const database = mySession.getSchema('lanesdb');
  return { session: mySession, database };
};

//
module.exports = connect();
