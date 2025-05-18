import winston from 'winston';

const { combine, timestamp, printf, colorize, json } = winston.format;

// Formato customizado para o console
const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((info) => {
    const { timestamp, level, message, ...rest } = info;
    return `[${timestamp}] ${level}: ${message}` + 
           (Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : '');
  })
);

// Formato para arquivos
const fileFormat = combine(
  timestamp(),
  json()
);

export const logger = winston.createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Exibe no console se não estiver em produção
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: consoleFormat
  }));
}