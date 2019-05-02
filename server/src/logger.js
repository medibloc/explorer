import fs from 'fs';
import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf } = winston.format;
const { DIR } = config.LOGGER;

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

const customFormat = printf(({
  level, message, timestamp: time,
}) => (`${time} [${level}] : ${message}`));

const options = {
  file: {
    level: 'info',
    filename: 'app.log',
    dirname: DIR,
    handleExceptions: true,
    json: true,
    maxsize: 1024 * 1024 * 5, // 5MB
    format: combine(
      timestamp(),
      customFormat,
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: false,
    json: false,
    format: combine(
      timestamp(),
      customFormat,
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export const stream = {
  write: message => logger
    .info(message.substring(0, message.lastIndexOf('\n'))),
};

export default logger;
