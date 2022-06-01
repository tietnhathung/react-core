import log4js from "log4js";

log4js.configure({
    appenders: {
        file: {
            type: 'dateFile',
            filename: 'logs/appLog.log',
            pattern: "yyyy-MM-dd-hh",
            compress: true
        },
        out: {type: 'stdout'}
    },
    categories: {default: {appenders: ["file", "out"], level: "info"}}
});

export const appLogger = log4js.getLogger();

