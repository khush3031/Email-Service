const router = require('express').Router()
const settingController = require("./settingController")

router.post("/create", settingController.createSetting)

module.exports = router