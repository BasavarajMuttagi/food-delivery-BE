import express from "express";
import { getMenuItemPriceByID, getMenu } from "../controllers/menu.controller";
import { validateToken } from "../middlewares/auth.middleware";

const MenuRouter = express.Router();

MenuRouter.get("/", validateToken, getMenu);
MenuRouter.get("/getPriceById", validateToken, getMenuItemPriceByID);
export { MenuRouter };
