import winston from 'winston'

const config = {
    levels: {
        error: 0,
        warning: 1,
        http: 2,
        info: 3,
    },
    colors: {
        error: 'red',
        warning: 'yellow',
        http: 'blue',
        info: 'white'
    }
}

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});


export const logger = winston.createLogger({
    levels: config.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
            winston.format.colorize({ colors: config.colors }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            customFormat
        )}),
        new winston.transports.File({
            level: 'warning', 
            filename: 'logs/combined.log', 
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )}),
        new winston.transports.File({ 
            level: 'error', 
            filename: 'logs/errors.log', 
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
        )})
    ]
})

export const addLoggerHttp = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} in ${req.url}}`);
    next();
}

export const loggerSessions = (req, res, next) => {
    req.logger = logger;
    req.logger.warning({
        level: 'warning',
        message: 'user logged'
    });
    next();
}