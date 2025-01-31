const mongoose = require("mongoose");
const { DB } = require("./config");

const usrCredentials = ''
if(DB.USER_NAME && DB.PASSWORD) usrCredentials = `${DB.USER_NAME}:${DB.PASSWORD}@`
const dbConnectionUrl = `${DB.CONNECTION}://${usrCredentials}${DB.HOST}:${DB.PORT}/${DB.DATABASE}`

const connectTODb = async () => {
    mongoose.connect(dbConnectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected', async() => {
        logger.info("Connection with db established successfully.")
    })

    mongoose.connection.on('error', async() => {
        logger.error("Error - while trying to connect with database...")
    })

    mongoose.connection.on('disconnect', async() => {
        logger.error("database disconnected...")
    })
}

module.exports = connectTODb