const {Sequelize} = require('sequelize');
const {
    DATABASE,
    PORT_DB,
    USER_DB,
    PASSWORD_DB,
    HOST_DB
} = require('../const/const');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: DATABASE,
    host: HOST_DB,
    password: PASSWORD_DB,
    port: PORT_DB,
    username: USER_DB,
    logging: false
});

module.exports = sequelize;