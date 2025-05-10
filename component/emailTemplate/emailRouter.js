const { createEmailTemplateController } = require("./emailTemplateController")

const router = require("express").Router()

router.post("/create", createEmailTemplateController)

module.exports = router