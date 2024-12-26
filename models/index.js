const dbConfig = require('../config/db-config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USERNAME,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT
}
)

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.sequelize = sequelize;
db.products = require('./products.js')(sequelize, DataTypes);
db.reviews = require('./review.js')(sequelize, DataTypes);
db.users = require('./user.js')(sequelize, DataTypes);

db.products.hasMany(db.reviews);
db.reviews.belongsTo(db.products);

// Synchronize the model with the database schema
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
  
module.exports = db;