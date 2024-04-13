import { DIET, IndianMenuCategory } from "@prisma/client";
import prisma from "./PrismaClient";
async function main() {
  const menuItems = [
    {
      name: "Samosas",
      description: "Triangular pastries filled with spiced potatoes or meat.",
      price: 350.81,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Pakoras",
      description:
        "Vegetables or meat coated in chickpea flour batter and deep-fried.",
      price: 385.19,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Chaat",
      description: "Savory snacks like bhel puri, pani puri, or dahi puri.",
      price: 484.19,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Tandoori Chicken",
      description: "Marinated chicken cooked in a clay oven.",
      price: 623.81,
      dietType: "NON_VEG",
      category: "APPETIZERS",
    },
    {
      name: "Curries",
      description: "A variety of vegetarian and non-vegetarian curries.",
      price: 831.19,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Biryani",
      description:
        "Fragrant rice dish cooked with spices and meat or vegetables.",
      price: 922.81,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Tandoori Dishes",
      description:
        "Grilled meats or vegetables marinated in yogurt and spices.",
      price: 816.69,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Dal",
      description: "Lentil dishes like dal makhani or dal tadka.",
      price: 519.69,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Vegetable Dishes",
      description:
        "A variety of vegetarian dishes like aloo gobi, baingan bharta, or palak paneer.",
      price: 570.31,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Naan",
      description:
        "Plain, garlic, butter, or stuffed varieties of Indian bread.",
      price: 189.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Roti",
      description: "Whole wheat flatbread.",
      price: 124.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Paratha",
      description: "Flaky, layered flatbread.",
      price: 217.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Plain Rice",
      description: "Plain steamed rice.",
      price: 152.19,
      dietType: "VEG",
      category: "RICE",
    },
    {
      name: "Pulao",
      description: "Fragrant rice cooked with vegetables, meat, or spices.",
      price: 364.19,
      dietType: "NON_VEG",
      category: "RICE",
    },
    {
      name: "Raita",
      description: "Yogurt with cucumber, onion, or other vegetables.",
      price: 201.19,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Papadum",
      description: "Thin, crispy lentil crackers.",
      price: 124.19,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Pickles and Chutneys",
      description: "Assorted pickles and chutneys.",
      price: 186.31,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Gulab Jamun",
      description: "Deep-fried milk balls soaked in sugar syrup.",
      price: 279.69,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Rasgulla",
      description: "Soft, spongy balls of cottage cheese in sugar syrup.",
      price: 309.81,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Kheer",
      description: "Rice pudding.",
      price: 248.31,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Kulfi",
      description: "Indian ice cream.",
      price: 342.19,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Lassi",
      description: "Yogurt-based drink, sweet or salty.",
      price: 201.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Masala Chai",
      description: "Spiced tea.",
      price: 139.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Pepsi",
      description: "Refreshing cola drink.",
      price: 93.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "7 Up",
      description: "Lemon-lime flavored soda.",
      price: 93.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Coke",
      description: "Classic cola drink.",
      price: 93.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Soda",
      description: "Carbonated water.",
      price: 93.19,
      dietType: "VEG",
      category: "BEVERAGES",
    },
  ];

  menuItems.forEach(async (eachCar) => {
    const { name, description, price, dietType, category } = eachCar;
    const result = await prisma.menuItem.upsert({
      where: { id: "" },
      update: {},
      create: {
        name,
        description,
        price,
        dietType: dietType as DIET,
        category: category as IndianMenuCategory,
      },
    });

    console.log(result);
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
