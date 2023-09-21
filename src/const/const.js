require('dotenv').config();

const environmentVariable = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    USER_DB: process.env.USER_DB,
    PASSWORD_DB: process.env.PASSWORD_DB,
    PORT_DB: process.env.PORT_DB,
    HOST_DB: process.env.HOST_DB
}

module.exports = environmentVariable;