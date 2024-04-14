import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { getMenuItemPriceByID } from "./menu.controller";
import { CouponCode, TaxRule } from "@prisma/client";

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

export { createOrder, getOrderById, getAllOrders, getQuote };

const calculateTotalAmount = async (items: Item[]) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

const calculateQuote = async (items: Item[], couponCode?: string) => {
  const finalResponseObject: any = {};
  let discount;
  const itemPricePromises = items.map(async (element: Item) => {
    const price = await getMenuItemPriceByID(element.itemId);
    return { ...element, price: price! };
  });
  const result = (await getTaxInfo()) as TaxRule;

  const ItemsArray: Item[] = await Promise.all(itemPricePromises);
  let subtotal = await calculateTotalAmount(ItemsArray);

  if (couponCode) {
    try {
      discount = (await applyDiscount(subtotal, couponCode)) as DiscountResult;
      console.log(discount);
      const tax = discount?.subtotal * (result.taxRate / 100);
      const GrandTotal = discount?.subtotal + tax;
      finalResponseObject.subtotal = discount?.subtotal;
      finalResponseObject.tax = tax;
      finalResponseObject.GrandTotal = GrandTotal;
      finalResponseObject.taxRate = result.taxRate;
      finalResponseObject.taxType = result.taxType;
      finalResponseObject.discount = discount;
      finalResponseObject.isDiscountApplied = true;
      finalResponseObject.discountError = false;
      finalResponseObject.ItemsArray = ItemsArray;
    } catch (error: any) {
      const tax = subtotal * (result.taxRate / 100);
      const GrandTotal = subtotal + tax;
      finalResponseObject.discount = { error: error.toString() };
      finalResponseObject.isDiscountApplied = false;
      finalResponseObject.subtotal = subtotal;
      finalResponseObject.tax = tax;
      finalResponseObject.GrandTotal = GrandTotal;
      finalResponseObject.taxRate = result.taxRate;
      finalResponseObject.taxType = result.taxType;
      finalResponseObject.isDiscountApplied = true;
      finalResponseObject.discountError = true;
      finalResponseObject.ItemsArray = ItemsArray;
    }
  } else {
    const tax = subtotal * (result.taxRate / 100);
    const GrandTotal = subtotal + tax;
    finalResponseObject.subtotal = subtotal;
    finalResponseObject.tax = tax;
    finalResponseObject.GrandTotal = GrandTotal;
    finalResponseObject.taxRate = result.taxRate;
    finalResponseObject.taxType = result.taxType;
    finalResponseObject.isDiscountApplied = false;
    finalResponseObject.ItemsArray = ItemsArray;
  }

  return finalResponseObject;
};

const getTaxInfo = async () => {
  try {
    const result = await PrismaClient.taxRule.findUnique({
      where: {
        id: "cluzefx4g000037p5y1e49ji8",
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

const getDiscount = async (couponCode: string) => {
  try {
    const result = await PrismaClient.couponCode.findUnique({
      where: {
        code: couponCode,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

const applyDiscount = async (subtotal: number, couponCode: string) => {
  const originalSubTotal = subtotal;
  const discount = (await getDiscount(couponCode)) as CouponCode;
  if (discount == null) {
    throw new Error("coupon invalid");
  }
  if (discount.discountType === "PERCENTAGE") {
    if (!(subtotal > discount.minimumOrderValue!)) {
      throw new Error(
        `Add More Products worth ${discount.minimumOrderValue! - subtotal}`
      );
    }
    if (!isDateInRange(new Date(), discount.startDate, discount.endDate)) {
      throw new Error(`Coupon Expired!`);
    }
    const deduction = subtotal * (discount.value / 100);
    subtotal -= deduction;
    return { originalSubTotal, subtotal, couponCode, saved: deduction };
  }

  if (discount.discountType === "FIXED_AMOUNT") {
    if (!(subtotal > discount.minimumOrderValue!)) {
      throw new Error(
        `Add More Products worth ${discount.minimumOrderValue! - subtotal}`
      );
    }

    if (!isDateInRange(new Date(), discount.startDate, discount.endDate)) {
      throw new Error(`Coupon Expired!`);
    }

    subtotal -= discount.value;
    return { originalSubTotal, subtotal, couponCode, saved: discount.value };
  }

  throw new Error("coupon invalid");
};

const isDateInRange = (dateToCheck: Date, startDate: Date, endDate: Date) => {
  return dateToCheck >= startDate && dateToCheck <= endDate;
};

type DiscountResult = {
  originalSubTotal: number;
  subtotal: number;
  couponCode: string;
  saved: number;
};

type Item = {
  itemId: string;
  quantity: number;
  price: number;
};

type Discount = {
  originalSubTotal: number;
  subtotal: number;
  couponCode: string;
  saved: number;
  error: string;
};

type QuoteType = {
  GrandTotal: number;
  subtotal: number;
  tax: number;
  taxRate: number;
  taxType: string;
  isDiscountApplied: boolean;
  discount?: Discount;
  discountError?: boolean;
  ItemsArray: Item[];
};
