import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 4000;

async function bootstrap() {
  const server: Server = app.listen(port, () => {
    // serverLogger.info("Alwan Clothing Server Started");
    // serverLogger.info(
    //   `Alwan Clothing Server started on http://localhost:${port}`
    // );
    console.log(`server started on http://localhost:${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        // serverLogger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    // serverLogger.error("Unexpected error", { error });
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    // serverLogger.info("SIGTERM received");
    if (server) {
      server.close(() => {
        // serverLogger.info("Server closed on SIGTERM");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
}

bootstrap();
