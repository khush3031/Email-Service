const settingService = require("./settingService")

const createSetting = async (req, res) => {
    try {
        const result = await settingService.createSetting(req.body)
        console.log('result: ', result);
        if(result.flag) res.status(200).send({ status: "success", message: "setting created successfully.", data: result })
        else {
            console.log('else: ');
            res.status(409).send({ status: "error", message: "setting is already exists in the system." })
        }
    } catch (er) {
        logger.error("Error (controller) - createSetting ", er)
        throw new Error(er)
    }
}

module.exports = {
    createSetting
}