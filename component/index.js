const router = require("express").Router()
const settingRouter = require("./setting/settingroutes")

router.use("/settings", settingRouter)

module.exports = router