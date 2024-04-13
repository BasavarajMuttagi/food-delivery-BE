import express from "express";
import { createOrder } from "../controllers/order.controller";
import { validateToken } from "../middlewares/auth.middleware";

const OrderRouter = express.Router();

OrderRouter.get("/create", validateToken, createOrder);

export { OrderRouter };
