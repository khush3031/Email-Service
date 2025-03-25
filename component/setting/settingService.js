const Setting = require("./settingModels")

const isCodeExists = async ({ id, data }) => {
    try {
        const getSettingQuery = { ...(id ? { _id: { $ne: id } } : {}), code: data.code }  
        return await Setting.findOne(getSettingQuery)
    } catch (error) {
        logger.error("Error - isCodeExists ", error)
        throw new Error(error)
    }
}

const createSetting = async (data) => {
    try {
        const checkSettingAvailability = await isCodeExists({ data })
        if(checkSettingAvailability) return { flag: false, data: checkSettingAvailability }
        return { flag: true, data: await Setting.create(data) }
    } catch (error) {
        logger.error("Error -  createSetting ", error)
        throw new Error(error)
    }
}

module.exports = {
    createSetting
}