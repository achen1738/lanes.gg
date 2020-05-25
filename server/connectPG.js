const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();
let database;
let session;
const connect = async () => {
  if (!database || !session) {
    // Connect to server on localhost
    session = await mysqlx.getSession({
      host: 'localhost',
      port: 33060,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS
    });
    await session.sql(`USE ${process.env.MYSQL_DB}`).execute();
    database = session.getSchema('lanesdb');
  }
  return { session, database };
};

const getConnections = () => {
  return { database, session };
};

module.exports = {
  connect,
  getConnections
};
