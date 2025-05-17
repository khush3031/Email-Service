const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const mailgun = require('mailgun-js');
const { PROVIDER } = require('../config/constant/emailProvider');
const SibApiV3Sdk = require('sib-api-v3-sdk')
const Resend = require('resend')
const postmark = require('postmark')
const axios = require("axios")

const sendEmail = async ({ to, toUsrNm, subject, text, html, provider = 'GMAIL' }) => {
    try {
        switch (provider) {
            case PROVIDER.GMAIL:
                await sendViaGmail({ to, subject, text, html });
            break

            case PROVIDER.SEND_GRID:
                await sendViaSendGrid({ to, subject, text, html });
            break

            case PROVIDER.MAIL_GUN:
                await sendViaMailgun({ to, subject, text, html });
            break

            case PROVIDER.MAILER_SEND: 
                await sendEmailViaMailerService({ to, toUsrNm, subject, text, html })
            break
            
            case PROVIDER.BREVO:
                await sendMailViaBrevo({ to, toUsrNm, subject, text, html })
            break

            case PROVIDER.RESEND: 
                await sendEmailViaResend({ to, subject, text, html })
            break
            
            case PROVIDER.ELASTIC_SERVICE:
                await sendEmailViaElasticService({ to, subject, text, html })
            break

            case PROVIDER.POSTMARK:
                await sendEmailUsingPostMark({ to, subject, text, html })
            break

            default:
                throw new Error('Unsupported email provider');
        }
    } catch (err) {
        console.error(`Failed to send email via ${provider}:`, err.message);
        throw err;
    }
}

const sendViaGmail = async ({ to, subject, text, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = { from: process.env.EMAIL_USER, to, subject, text, html }

        return await transporter.sendMail(mailOptions)
    } catch (error) {
        logger.error("Error - sendNodeMail ", error)
        throw new Error(error)
    }
}

const sendViaSendGrid = async ({ to, subject, text, html }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = { to, from: process.env.EMAIL_USER, subject, text, html }

    return await sgMail.send(msg)
}

const sendViaMailgun = async ({ to, subject, text, html }) => {
    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    })

    const data = { from: process.env.EMAIL_USER, to, subject, text, html }

    return await mg.messages().send(data)
}

const sendEmailViaMailerService = async ({ to, toUsrNm, subject, text, html }) => {
    try {
        const data = {
            from: {
                email: process.env.MAILER_SENDER_EMAIL, // Must be a verified domain
                name: process.env.MAIL_SENDER_NAME,
              },
              to: [
                {
                  email: to,
                  name: toUsrNm ?? "",
                },
              ],
              subject,
              text,
              html
        }
        const config =  {
            method: 'POST',
            url: process.env.MAILERSEND_BASE_URL,
            headers: {
                Authorization: `Bearer ${process.env.MAILERSEND_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data
        }
        const mailSendRes = await axios(config)
        return mailSendRes.data
    } catch (error) {
        logger.error("Error - sendEmailViaMailerService ", error)
        throw new Error(error)
    }
}

const sendMailViaBrevo = async ({ to, toUsrNm, subject, text, html }) => {
    try {
        const client = SibApiV3Sdk.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.BREVO_API_KEY

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
        const sendSmtpEmail = {
            to: [{ email: to, name: toUsrNm }],
            sender: { email: process.env.EMAIL_USER, name: 'Khushboo makwana' },
            subject,
            htmlContent,
            textContent: text,
        }
        return await apiInstance.sendTransactionalEmail(sendSmtpEmail)
    } catch (error) {
        logger.error("Error - sendMailViaBrevo ", error)
        throw new Error(error)
    }
}

const sendEmailViaResend = async ({ to, subject, text, html }) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        resend.emails.send({
            from: process.env.RESEND_SENDER_EMAIL,
            to,
            subject,
            html
        })
    } catch (error) {
        logger.error("Error - sendEmailViaResend ",error)
        throw new Error(error)
    }
}

const sendEmailViaElasticService = async({ to, subject, text, html }) => {
    try {
        const API_KEY = process.env.ELASTIC_EMAIL_API_KEY
        const SENDER = process.env.EMAIL_USER; // Must be verified
        const RECIPIENT = to;
        const params = new URLSearchParams();
        params.append('apikey', API_KEY);
        params.append('from', SENDER);
        params.append('to', RECIPIENT);
        params.append('subject', subject);
        params.append('bodyHtml', html);
        params.append('bodyText', text);
    
        const response = await axios.post(
          process.env.ELASTIC_SEND_EMAIL_URL,
          params
        );
        return response.data
    } catch (error) {
        logger.error("Error - sendEmailViaElasticService ", error)
        throw new Error(error)
    }
}

const sendEmailUsingPostMark = async({ to, subject, text, html }) => {
    try {
        console.log('sendEmailUsingPostMark: ');
        const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN)
        console.log('to: ', to);
        console.log('process.env.POSTMARK_EMAIL: ', process.env.POSTMARK_EMAIL);
        const resposne = await client.sendEmail({
            From: process.env.POSTMARK_EMAIL,
            To: to,
            Subject: subject,
            HtmlBody: html,
            TextBody: text
        })
        console.log('resposne: ', resposne);
    } catch (error) {
        logger.error("Error - sendEmailUsingPostMark ", error)
        throw new Error(error)
    }
}

module.exports = { sendEmail }