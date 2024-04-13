import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
const getMenu = async (req: Request, res: Response) => {
  try {
    const result: [
      {
        result: {};
      }
    ][] = await PrismaClient.$queryRaw`
      SELECT json_object_agg(category, items_in_category) AS result
      FROM (
        SELECT category, json_agg(
          json_build_object(
            'name', name,
            'description', description,
            'price', price,
            'diet', "dietType",
            'imageUrl', "imageUrl"
          ) ORDER BY name
        ) AS items_in_category
        FROM "MenuItem"
        GROUP BY category
      ) AS categories`;

    return res.status(200).send(result[0]);
  } catch (error) {
    return res.send(error);
  }
};

export { getMenu };

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  dietType: string;
  category: string;
  imageUrl: string;
}

interface GroupedItems {
  [category: string]: Item[];
}
