const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';


// Verificar carga de variables de entorno
if (!process.env.DB_USER || !process.env.DB_PASS) {
  throw new Error('Las variables de entorno para la base de datos no están configuradas');
}

const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos establecida correctamente'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
