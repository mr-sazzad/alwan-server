"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("./app/routes");
const express_session_1 = __importDefault(require("express-session"));
const global_error_handler_1 = __importDefault(require("./middlewares/global-error-handler"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// cors middleware
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use(express_1.default.json());
// express session middleware
app.use((0, express_session_1.default)({
    secret: "alwan-clothing",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60,
    },
}));
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "ALWAN CLOTHING",
        author: "K&S",
        version: "0.0.1",
        start_date: "18-04-2024",
        greetings: "Welcome to the ALWAN CLOTHING server",
        engine: "node v20.9.0",
    });
});
// initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// global routes middleware
app.use("/api/v1", routes_1.globalRoutes);
// global error handler middleware
app.use(global_error_handler_1.default);
// not found error handler middleware
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
