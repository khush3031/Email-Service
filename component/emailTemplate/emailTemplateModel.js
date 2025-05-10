const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: { type: String },
    code: { type: String },
    text: { type: String },
    html: { type: String },
    subject: { type: String },
    canDel: { type: Boolean, default: true },
    canUpdate: { type: Boolean, default: true },
    canView: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    updatedBy: { type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true })

schema.pre(["save"], async function (next) {
    const isCodeExists = await emailTemplate.findOne({ code: this.code })
    if(isCodeExists) logger.error(`Error - code exists ${this.code}`)
})

const emailTemplate = new mongoose.model("emailTemplate", schema, "emailTemplate")
module.exports = emailTemplate