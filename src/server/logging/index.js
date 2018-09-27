import process from 'process';
import winston from 'winston';
import expressWinston from 'express-winston';
import PostgresTransport from './postgres';

const logger = winston.createLogger({
  level: 'info',
  transports: [],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

if (process.env.NODE_ENV !== 'test') {
  logger.add(new PostgresTransport({ table: 'logs' }));
  logger.add(
    new winston.transports.File({
      filename: 'logs/log.txt',
      format: winston.format.simple(),
    }),
  );
}

export const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}}',
});

export const expressErrorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}} - {{err.name}}',
});
