import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const result = await PrismaClient.order.create({
      data: {
        totalAmount: 1000,
        userId: "0de65ab5-0009-4711-b61c-b5f4d51dca05",
        items: {
          connect: [
            { id: "cluxqw2j00000oun25qtx135b" },
            { id: "cluxqw3u70001oun2nzzhyq3a" },
          ],
        },
      },
    });

    return res.status(201).send(result);
  } catch (error) {
    return res.send(error);
  }
};

export { createOrder };
