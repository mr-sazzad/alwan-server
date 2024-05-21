import createLogger from "./winston";

export const serverLogger = createLogger({ service: "application-server" });
export const orderServiceLogger = createLogger({ service: "order-service" });
