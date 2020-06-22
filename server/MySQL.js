const Sequelize = require('sequelize');
require('dotenv').config();

let db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
    operatorsAliases: '0'
  }
);

let models = [
  require('./models/GamesModel.js'),
  require('./models/MatchesModel.js'),
  require('./models/SummonerModel.js'),
  require('./models/LeaguesModel.js')
];

// Initialize models
models.forEach(model => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

// db.matches.hasMany(db.matches, { alias: 'm1' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
