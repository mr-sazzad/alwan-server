"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
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
    json: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: customTimestampFormat }), winston_1.default.format.prettyPrint()),
    simple: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
};
// Function to create a logger with specific default metadata
const createLogger = (defaultMeta) => {
    // Transport for rotating file logs
    const rotatingFileTransport = new winston_1.default.transports.DailyRotateFile({
        filename: "logs/alwan-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: customFormats.json,
    });
    const errorTransport = new winston_1.default.transports.File({
        filename: "logs/error.log",
        level: "error",
        format: customFormats.json,
    });
    const consoleTransport = new winston_1.default.transports.Console({
        format: customFormats.simple,
    });
    // Define transports array with appropriate typing
    const transports = [rotatingFileTransport, errorTransport];
    if (process.env.NODE_ENV !== "production") {
        transports.push(consoleTransport);
    }
    // Create the logger
    const logger = winston_1.default.createLogger({
        level: "info",
        format: customFormats.json,
        defaultMeta,
        transports,
    });
    // Adding exception handling
    logger.exceptions.handle(new winston_1.default.transports.File({
        filename: "logs/exceptions.log",
        format: customFormats.json,
    }));
    return logger;
};
exports.default = createLogger;
