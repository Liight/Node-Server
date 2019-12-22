const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-server', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;