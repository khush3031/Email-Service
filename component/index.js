const router = require("express").Router()
const settingRouter = require("./setting/settingroutes")
const emailTemplateRouter = require("./emailTemplate/emailRouter")
const sendEmailRouter = require("../services/emaiNotification")

router.use("/settings", settingRouter)
router.use("/email-template", emailTemplateRouter)
router.use("/mail-service", sendEmailRouter)

module.exports = router