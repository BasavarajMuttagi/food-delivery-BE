import express from "express";
import {
  getUserInfo,
  LoginUser,
  SignUpUser,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { userLoginSchema, userSignUpSchema } from "../zod/authSchemas";
import { validateToken } from "../middlewares/auth.middleware";

const AuthRouter = express.Router();

AuthRouter.post("/signup", validate(userSignUpSchema), SignUpUser);
AuthRouter.post("/login", validate(userLoginSchema), LoginUser);
AuthRouter.get("/getuser", validateToken, getUserInfo);

export { AuthRouter };
