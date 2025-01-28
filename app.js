const express = require("express")
const { APP } = require("./config/config")
require('dotenv')
global.logger = require("./utils/helper/logger")

const app = express()
app.use(logger.morganInstants)

app.listen(APP.PORT, () => console.log(`server started on port ${APP.PORT}`))