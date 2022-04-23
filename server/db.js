const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,            //название БД
    process.env.DB_USER,            //имя пользователя
    process.env.DB_PASSWORD,        //пароль
    {
        host: process.env.DB_HOST,  //хост
        port: process.env.DB_PORT,  //порт
        dialect: 'postgres',        //диалект
    }
)