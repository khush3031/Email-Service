const { sendEmail } = require("./sendEmailService")
const EmailTemplate = require("../component/emailTemplate/emailTemplateModel");
const { replaceVariables } = require("../utils/common");
const router = require("express").Router()

router.post("/send-email/:provider", async(req, res) => {
    const emailTemplate = await EmailTemplate.findOne({ code: 'WELCOME_EMAIL' })
    const replaceVal = {
        [`{{platformNm}}`]: "Sixth sense Automation"
    }
    const html = replaceVariables(emailTemplate.html, replaceVal)
    const subject = replaceVariables(emailTemplate.subject, replaceVal)
    await sendEmail({ to: req.body.email, subject, text: emailTemplate.text, html, provider: req.query.provider })
    res.send(200).json({ message: "Email send successfully." })
})

module.exports = router

/**
 * {
            "active": false,
            "default": false,
            "name": "aws",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "publickKey": "",
                "secretKey": ""
            }
        },
        {
            "active": true,
            "default": false,
            "name": "send grid",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": ""
            }
        },
        {
            "active": false,
            "default": false,
            "name": "node mailer",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": "",
                "publickKey": ""
            }
        },
        {
            "active": false,
            "default": false,
            "name": "ethereal mail service(For Testing purpose)",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": "",
                "publickKey": ""
            }
        },
        {
            "active": false,
            "default": false,
            "name": "mail trap",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": "",
                "publickKey": ""
            }
        },
        {
            "active": false,
            "default": false,
            "name": "postmark",
            "credentials":{
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": ""
            }
        },
        {
            "active": false,
            "default": false,
            "name": "mailgun",
            "credentials": {
                "sender_email": "mkwkhush@gmail.com",
                "secretKey": "",
                "domain": ""
            }
        }
 */