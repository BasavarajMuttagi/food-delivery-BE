import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
config();

import { createServer } from "http";

import { MenuRouter } from "./src/routes/menu.route";
import { OrderRouter } from "./src/routes/order.route";
import { AuthRouter } from "./src/routes/auth.route";
import rateLimit from "express-rate-limit";
const App = express();
const HttpServer = createServer(App);

export const PORT = process.env.PORT;
export const DB_SECRET = process.env.DB_SECRET as string;
export const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET as string;
export const CAPTCHA_VERIFY_ENDPOINT = process.env
  .CAPTCHA_VERIFY_ENDPOINT as string;
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again after 5 minutes",
});
App.use(limiter);
App.use(cors());
App.use(bodyParser.json());
App.use("/auth", AuthRouter);

App.get("/", (req, res) => {
  return res.send("Hello World");
});

App.use("/menu", MenuRouter);
App.use("/order", OrderRouter);
HttpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default App;
