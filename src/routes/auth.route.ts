import express from "express";
import { LoginUser, SignUpUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { userLoginSchema, userSignUpSchema } from "../zod/authSchemas";


const AuthRouter = express.Router();

AuthRouter.post("/signup", validate(userSignUpSchema), SignUpUser);
AuthRouter.post("/login", validate(userLoginSchema), LoginUser);

export { AuthRouter };
