import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import PrismaClient from "../../prisma/PrismaClient";
import { DB_SECRET } from "../..";
import { tokenType } from "../middlewares/auth.middleware";

const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, address, country, state, city, phone } =
      req.body;
    const isUserExists = await PrismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (isUserExists) {
      res.status(409).send({ message: "Account Exists!" });
      return;
    }
    const encryprtedPassword = await bcrypt.hash(password, 10);
    const record = await PrismaClient.user.create({
      data: {
        fullname,
        email,
        password: encryprtedPassword,
        address,
        country,
        state,
        city,
        phone,
      },
    });

    res.status(201).send({ message: "Account Created SuccessFully!", record });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await PrismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!User) {
      res.status(409).send({ message: "User Not Found!" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      User.password as string
    );
    if (!isPasswordMatch) {
      res.status(400).send({ message: "email or password incorrect" });
      return;
    }
    const token = sign(
      {
        userId: User.id,
        email: User.email,
        name: User.fullname,
      },
      DB_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).send({
      user: {
        name: User.fullname,
      },
      token: token,
      message: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "Error Occured , Please Try Again!" });
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const result = await PrismaClient.user.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        address: true,
        country: true,
        state: true,
        fullname: true,
        city: true,
        phone: true,
      },
    });

    return res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ message: "Error Occured , Please Try Again!" });
  }
};

export { SignUpUser, LoginUser, getUserInfo };
