import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { QuoteType } from "../common/types";
import { calculateQuote, flattenResult } from "../common/helper";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const { items, couponCode } = req.body;
    const { ItemsArray, subtotal, tax, GrandTotal, taxRate, discount } =
      (await calculateQuote(items, couponCode)) as QuoteType;

    const order = await PrismaClient.order.create({
      data: {
        userId: user.userId,
        total: GrandTotal,
        subtotal,
        tax_rate: taxRate,
        tax,
        couponCode,
        discountValue: discount?.saved,
        OrderItem: {
          create: ItemsArray,
        },
      },
    });

    return res.status(201).send(order);
  } catch (error) {
    return res.send(error);
  }
};

const getQuote = async (req: Request, res: Response) => {
  try {
    const { items, couponCode } = req.body;
    const result = await calculateQuote(items, couponCode);
    return res.status(200).send(result);
  } catch (error) {
    return res.send(error);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const id = req.params.id;
    if (id.length == 0) {
      return res.sendStatus(400);
    }
    const result = await PrismaClient.order.findUnique({
      where: {
        id,
        userId: user.userId,
      },
      include: {
        _count: true,
        OrderItem: {
          include: {
            menuItem: true,
          },
        },
      },
    });
    return res.status(201).send(result);
  } catch (error) {
    return res.send(error);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const result = await PrismaClient.order.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        _count: true,
        OrderItem: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.send(error);
  }
};

const reOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const id = req.params.id;
    if (id.length == 0) {
      console.log(id);
      return res.sendStatus(400);
    }
    const result = await PrismaClient.order.findUnique({
      where: {
        id,
        userId: user.userId,
      },
      select: {
        OrderItem: {
          select: {
            itemId: true,
            quantity: true,
            menuItem: {
              select: {
                description: true,
                dietType: true,
                imageUrl: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const flattenedResult = flattenResult(result?.OrderItem!);
    return res.status(201).send({ result: flattenedResult });
  } catch (error) {
    return res.send(error);
  }
};

export { createOrder, getOrderById, getAllOrders, getQuote, reOrder };
