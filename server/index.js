require('dotenv').config()
const express  = require('express')
const sequelize = require('sequelize')

const app = express()
const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

