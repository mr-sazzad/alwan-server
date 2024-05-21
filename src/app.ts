import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import { globalRoutes } from "./app/routes";
import session from "express-session";
import globalErrorHandler from "./middlewares/global-error-handler";
import path from "path";

const app = express();

// cors middleware
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(express.json());

// express session middleware
app.use(
  session({
    secret: "alwan-clothing",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.get("/", (req: Request, res: Response) => {
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
app.use(passport.initialize());
app.use(passport.session());

// global routes middleware
app.use("/api/v1", globalRoutes);

// global error handler middleware
app.use(globalErrorHandler);

// not found error handler middleware
app.use((req: Request, res: Response, next: NextFunction) => {
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

export default app;
