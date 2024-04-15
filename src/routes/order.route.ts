import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getQuote,
  reOrder,
} from "../controllers/order.controller";
import { validateToken } from "../middlewares/auth.middleware";

const OrderRouter = express.Router();

OrderRouter.post("/create", validateToken, createOrder);
OrderRouter.get("/getOneOrder/:id", validateToken, getOrderById);
OrderRouter.get("/reOrder/:id", validateToken, reOrder);
OrderRouter.get("/getAllOrders", validateToken, getAllOrders);
OrderRouter.post("/getQuote", validateToken, getQuote);

export { OrderRouter };
