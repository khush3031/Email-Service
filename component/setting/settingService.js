const setting = require("./settingModels")

const isCodeExists = async ({ id, data }) => {
    try {
        return setting.findOne({ ...(id ? { _id: { $ne: id } } : {}), code: data.code })
    } catch (error) {
        logger.error("Error - isCodeExists ", error)
        throw new Error(error)
    }
}

const createSetting = async (data) => {
    try {
        if(isCodeExists({ data })) return { flag: false, data: "" }
        return { flag: true, data: await setting.create(data)}
    } catch (error) {
        logger.error("Error -  createSetting ", error)
        throw new Error(error)
    }
}

module.exports = {
    createSetting
}