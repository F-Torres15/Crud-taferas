const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskdb', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
