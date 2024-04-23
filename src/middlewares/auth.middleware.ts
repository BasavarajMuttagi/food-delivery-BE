const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { CAPTCHA_SECRET, CAPTCHA_VERIFY_ENDPOINT, DB_SECRET } from "../..";
import axios from "axios";

export type tokenType = {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, DB_SECRET, (err: Error, decoded: tokenType) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.body.user = decoded;
    next();
  });
};

const validateCaptchaToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await axios.post(CAPTCHA_VERIFY_ENDPOINT, {
      secret: CAPTCHA_SECRET,
      response: req.body.token,
      remoteip: req.ip,
    });
    if (result.data.success) {
      next();
    } else {
      throw new Error("Please Refresh And Try Again");
    }
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export { validateToken, validateCaptchaToken };
