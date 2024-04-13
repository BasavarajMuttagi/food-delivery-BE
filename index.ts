import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
config();

import { createServer } from "http";

import { MenuRouter } from "./src/routes/menu.route";
import { OrderRouter } from "./src/routes/order.route";
import { AuthRouter } from "./src/routes/auth.route";
const App = express();
const HttpServer = createServer(App);

export const PORT = process.env.PORT;
export const DB_SECRET = process.env.DB_SECRET as string;

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
