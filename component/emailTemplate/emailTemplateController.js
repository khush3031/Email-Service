const { createEmailTemplate } = require("./emailTemplateService")

const createEmailTemplateController = async(req, res) => {
    try {
        const result = await createEmailTemplate(req.body)
        if(result.flag) res.status(200).send({ status: "success", message: "emailTemplate created successfully.", data: result })
        else res.status(409).send({ status: "error", message: "emailTemplate is already exists in the system.", data: result.data })
    } catch (error) {
        loggers.error("Error - createEmailTemplate [CONTROLLER] ", error)
        throw new Error(error)
    }
}

module.exports = {
    createEmailTemplateController
}