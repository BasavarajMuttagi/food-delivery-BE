import express from "express";
import {
  getUserInfo,
  LoginUser,
  ResetPasswordEmail,
  SetNewPassword,
  SignUpUser,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { userLoginSchema, userSignUpSchema } from "../zod/authSchemas";
import {
  validateCaptchaToken,
  validateToken,
} from "../middlewares/auth.middleware";

const AuthRouter = express.Router();

AuthRouter.post(
  "/signup",
  validate(userSignUpSchema),
  validateCaptchaToken,
  SignUpUser
);
AuthRouter.post(
  "/login",
  validate(userLoginSchema),
  validateCaptchaToken,
  LoginUser
);
AuthRouter.get("/getuser", validateToken, getUserInfo);
AuthRouter.post("/reset-password", validateCaptchaToken, ResetPasswordEmail);
AuthRouter.post("/setnewpassword", validateCaptchaToken, SetNewPassword);



export { AuthRouter };
