import express from "express";
import { calculateTotal, getMenu } from "../controllers/menu.controller";
import { validateToken } from "../middlewares/auth.middleware";

const MenuRouter = express.Router();

MenuRouter.get("/", validateToken, getMenu);
MenuRouter.get("/calculate", validateToken, calculateTotal);
export { MenuRouter };
