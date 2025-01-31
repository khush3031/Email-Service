const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, align, colorize } = format
const moment = require("moment-timezone")
const morgan = require("morgan")

const customFormat = printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toLowerCase()} : ${message.trim()}`)

module.exports = createLogger({
    level: 'info',  // Default logging level (error, warn, info, http, verbose, debug, silly)
    transports: [
        new transports.Console({
            format: combine( timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Timestamp format
            align(),  // Aligns text properly
            colorize(),  // Adds color to console output
            customFormat )
        }),  // Log to console
        new transports.File({
            filename: `logs/error/${moment().format("MMM-DD-YYYY")}.log`,
            level: 'error',  // Log only error level messages to this file
            format: combine(timestamp(), customFormat),
        }),
        new transports.File({
            filename: `logs/info/${moment().format("MMM-DD-YYYY")}.log`,  // Log all levels to combined.log
            level: "info",
            format: combine(timestamp(), customFormat),
        })
    ]
})

module.exports.morganInstants = morgan("dev", {
    stream:{
        write: (str) => {
            logger.info(str)
        }
    }
})