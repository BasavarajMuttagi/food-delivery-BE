import express from "express";
import { getMenu } from "../controllers/menu.controller";

const MenuRouter = express.Router();

MenuRouter.get("/", getMenu);

export { MenuRouter };
