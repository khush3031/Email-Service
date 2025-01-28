const express = require("express")
const { APP } = require("./config/config")
require('dotenv')

const app = express()
app.listen(APP.PORT, () => console.log(`server started on port ${APP.PORT}`))