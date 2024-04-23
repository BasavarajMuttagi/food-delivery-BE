import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import PrismaClient from "../../prisma/PrismaClient";
import { DB_SECRET } from "../..";
import { tokenType } from "../middlewares/auth.middleware";
import { createTransport } from "nodemailer";
import moment from "moment";
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

const SetNewPassword = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    const user = await PrismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await PrismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: encryptedPassword,
      },
    });

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error occurred, Please Try Again!" });
  }
};

const ResetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await PrismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const token = sign({ userId: user.id }, DB_SECRET, { expiresIn: "1h" });
    const expirationDate = moment.utc().add(1, "hours").toDate();
    const result = await PrismaClient.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: expirationDate,
      },
    });

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.RESET_PASSWORD_EMAIL,
        pass: process.env.RESET_PASSWORD_SECRET,
      },
    });

    const mailOptions = {
      from: process.env.RESET_PASSWORD_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Please click <a href="${process.env.FE_RETURN_URL}/${token}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res
          .status(500)
          .send({ message: "Failed to send reset password email" });
      } else {
        res
          .status(200)
          .send({ message: "Reset password email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred, Please Try Again!" });
  }
};

export {
  SignUpUser,
  LoginUser,
  getUserInfo,
  SetNewPassword,
  ResetPasswordEmail,
};
