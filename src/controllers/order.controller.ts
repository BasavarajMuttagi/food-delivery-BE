import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { getMenuItemPriceByID } from "./menu.controller";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const { items } = req.body;
    const { ItemsArray, subtotal, tax, GrandTotal } = await calculateQuote(
      items
    );

    const order = await PrismaClient.order.create({
      data: {
        userId: user.userId,
        totalAmount: GrandTotal,
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
    const { items } = req.body;
    const result = calculateQuote(items);
    return res.status(200).send(result);
  } catch (error) {
    return res.send(error);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const id = req.params.id;
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
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.send(error);
  }
};

// const getTaxInfo = async () => {
//   try {
//     const result = await PrismaClient
//   } catch (error) {
//     return 0
//   }
// };

export { createOrder, getOrderById, getAllOrders, getQuote };

const calculateTotalAmount = async (items: Item[]) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

const calculateQuote = async (items: Item[]) => {
  const itemPricePromises = items.map(async (element: Item) => {
    const price = await getMenuItemPriceByID(element.itemId);
    return { ...element, price: price! };
  });
  const ItemsArray: Item[] = await Promise.all(itemPricePromises);
  const subtotal = await calculateTotalAmount(ItemsArray);
  const tax = subtotal * 0.18;
  const GrandTotal = subtotal + tax;
  return { ItemsArray, subtotal, tax, GrandTotal };
};

type Item = {
  itemId: string;
  quantity: number;
  price: number;
};
