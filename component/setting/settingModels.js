const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: { type: String },
    code: { type: String },
    data: { type: mongoose.Schema.Types.Mixed },
    canDel: { type: Boolean },
    canUpdate: { type: Boolean },
    canView: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    updatedBy: { type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true })

schema.pre(["save"], async function (next) {
    console.log("this: ", this)
    const isCodeExists = await setting.findOne({ code: this.code })
    if(isCodeExists) logger.error(`Error - code exists ${this.code}`)
})

const setting = new mongoose.model("setting", schema, "setting")
module.exports = setting