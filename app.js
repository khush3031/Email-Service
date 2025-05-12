global.logger = require("./utils/helper/logger")
const express = require("express")
const { APP } = require("./config/config")
const dotenv = require('dotenv')
const app = express()

dotenv.config()
app.use(logger.morganInstants)
const connectTODb = require('./config/db.Config')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
connectTODb()

app.use(express.urlencoded({ extended: true, limit: '1gb' }))
app.use(cookieParser())
app.use(express.json({ limit: '1gb' }))
app.use(express.json({ limit: '1gb' }))

app.use("/api/v1", require("./component/index"))

app.listen(APP.PORT, () => logger.info(`server started on port ${APP.PORT}`))