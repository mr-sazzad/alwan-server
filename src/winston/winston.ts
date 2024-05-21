import winston from "winston";
import "winston-daily-rotate-file";

// Define custom timestamp formatting function
const customTimestampFormat = () => {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return `${day} ${month} ${date} ${year}, ${time}`;
};

// Define custom formats
const customFormats = {
  json: winston.format.combine(
    winston.format.timestamp({ format: customTimestampFormat }),
    winston.format.prettyPrint()
  ),
  simple: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
};

// Function to create a logger with specific default metadata
const createLogger = (defaultMeta: object) => {
  // Transport for rotating file logs
  const rotatingFileTransport = new (winston.transports as any).DailyRotateFile(
    {
      filename: "logs/alwan-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: customFormats.json,
    }
  );

  const errorTransport = new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: customFormats.json,
  });

  const consoleTransport = new winston.transports.Console({
    format: customFormats.simple,
  });

  // Define transports array with appropriate typing
  const transports: (
    | winston.transport
    | winston.transports.ConsoleTransportInstance
  )[] = [rotatingFileTransport, errorTransport];

  if (process.env.NODE_ENV !== "production") {
    transports.push(consoleTransport);
  }

  // Create the logger
  const logger = winston.createLogger({
    level: "info",
    format: customFormats.json,
    defaultMeta,
    transports,
  });

  // Adding exception handling
  logger.exceptions.handle(
    new winston.transports.File({
      filename: "logs/exceptions.log",
      format: customFormats.json,
    })
  );

  return logger;
};

export default createLogger;
