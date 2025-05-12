const EmailTemplate = require("./emailTemplateModel")

const createEmailTemplate = async (data) => {
    try {
        return EmailTemplate.create(data)
    } catch (error) {
        loggers.error("Error - createEmailTemplate ", error)
        throw new Error(error)
    }
}

module.exports = {
    createEmailTemplate
}