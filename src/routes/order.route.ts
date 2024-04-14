import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getQuote,
} from "../controllers/order.controller";
import { validateToken } from "../middlewares/auth.middleware";

const OrderRouter = express.Router();

OrderRouter.post("/create", validateToken, createOrder);
OrderRouter.get("/getOneOrder", validateToken, getOrderById);
OrderRouter.get("/getAllOrders", validateToken, getAllOrders);
OrderRouter.post("/getQuote", validateToken, getQuote);

export { OrderRouter };
