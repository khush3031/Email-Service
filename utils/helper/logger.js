const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, align, colorize } = format

const customFormat = printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toLowerCase()} : ${message}`)

const logger = createLogger({
    level: 'info',  // Default logging level (error, warn, info, http, verbose, debug, silly)
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Timestamp format
        align(),  // Aligns text properly
        colorize(),  // Adds color to console output
        customFormat  // Use the custom format defined above
    ),
    transports: [
        new transports.Console(),  // Log to console
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',  // Log only error level messages to this file
            format: combine(timestamp(), customFormat),
        }),
        new transports.File({
            filename: 'logs/combined.log',  // Log all levels to combined.log
            format: combine(timestamp(), customFormat),
        })
    ]
})

module.exports = logger