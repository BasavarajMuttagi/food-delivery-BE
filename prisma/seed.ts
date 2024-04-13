import { DIET, IndianMenuCategory } from "@prisma/client";
import prisma from "./PrismaClient";
async function main() {
  const menuItems = [
    {
      name: "Samosas",
      description: "Triangular pastries filled with spiced potatoes or meat",
      price: 124.19,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Pakoras",
      description:
        "Vegetables or meat coated in chickpea flour batter and deep-fried",
      price: 385.19,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Chaat",
      description: "Savory snacks like bhel puri, pani puri, or dahi puri",
      price: 484.19,
      dietType: "VEG",
      category: "APPETIZERS",
    },
    {
      name: "Tandoori Chicken",
      description: "Marinated chicken cooked in a clay oven",
      price: 623.81,
      dietType: "NON_VEG",
      category: "APPETIZERS",
    },
    {
      name: "Paneer Butter Masala",
      description: "Creamy tomato-based curry with paneer",
      price: 570.31,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Chicken Tikka Masala",
      description: "Grilled chicken in a rich, spiced tomato-based sauce",
      price: 816.69,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Lamb Rogan Josh",
      description: "Lamb cooked in a flavorful gravy with spices",
      price: 922.81,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Vegetable Biryani",
      description: "Fragrant rice dish cooked with vegetables and spices",
      price: 364.19,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Chicken Biryani",
      description: "Fragrant rice dish cooked with chicken and spices",
      price: 922.81,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Paneer Biryani",
      description: "Fragrant rice dish cooked with paneer and spices",
      price: 816.69,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Tandoori Paneer",
      description: "Marinated paneer grilled in a clay oven",
      price: 816.69,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Tandoori Mixed Grill",
      description: "Assorted grilled meats and vegetables marinated in spices",
      price: 816.69,
      dietType: "NON_VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Dal Makhani",
      description: "Creamy lentil dish cooked with butter and cream",
      price: 519.69,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices",
      price: 519.69,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Aloo Gobi",
      description: "Potato and cauliflower curry",
      price: 570.31,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Baingan Bharta",
      description:
        "Smoky mashed eggplant cooked with tomatoes, onions, and spices",
      price: 570.31,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Palak Paneer",
      description: "Cottage cheese cubes in a creamy spinach gravy",
      price: 570.31,
      dietType: "VEG",
      category: "MAIN_COURSES",
    },
    {
      name: "Plain Naan",
      description: "Plain leavened Indian bread",
      price: 189.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Garlic Naan",
      description: "Naan bread flavored with garlic",
      price: 189.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Butter Naan",
      description: "Naan bread brushed with butter",
      price: 189.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Stuffed Naan",
      description: "Naan bread stuffed with spiced filling",
      price: 189.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Plain Roti",
      description: "Whole wheat Indian flatbread",
      price: 124.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Butter Roti",
      description: "Whole wheat Indian flatbread brushed with butter",
      price: 124.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Paratha",
      description: "Flaky, layered Indian flatbread",
      price: 217.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Stuffed Paratha",
      description:
        "Flaky, layered Indian flatbread stuffed with spiced filling",
      price: 217.19,
      dietType: "VEG",
      category: "BREADS",
    },
    {
      name: "Plain Rice",
      description: "Steamed plain rice",
      price: 152.19,
      dietType: "VEG",
      category: "RICE",
    },
    {
      name: "Vegetable Pulao",
      description: "Fragrant rice cooked with vegetables and spices",
      price: 374.19,
      dietType: "VEG",
      category: "RICE",
    },
    {
      name: "Chicken Pulao",
      description: "Fragrant rice cooked with chicken and spices",
      price: 609.19,
      dietType: "NON_VEG",
      category: "RICE",
    },
    {
      name: "Lamb Pulao",
      description: "Fragrant rice cooked with lamb and spices",
      price: 609.19,
      dietType: "NON_VEG",
      category: "RICE",
    },
    {
      name: "Cucumber Raita",
      description: "Yogurt with diced cucumber and spices",
      price: 89.19,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Onion Raita",
      description: "Yogurt with diced onion and spices",
      price: 89.19,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Mixed Raita",
      description: "Yogurt with mixed vegetables and spices",
      price: 89.19,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Masala Papadum",
      description: "Crispy lentil crackers topped with spices",
      price: 95.31,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Plain Papadum",
      description: "Crispy plain lentil crackers",
      price: 84.38,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Mango Pickle",
      description: "Spicy mango pickle",
      price: 65.63,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Mint Chutney",
      description: "Refreshing mint sauce",
      price: 65.63,
      dietType: "VEG",
      category: "ACCOMPANIMENTS",
    },
    {
      name: "Gulab Jamun",
      description: "Deep-fried milk balls soaked in sugar syrup",
      price: 124.19,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Rasgulla",
      description: "Soft, spongy balls of cottage cheese in sugar syrup",
      price: 124.19,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Kheer",
      description: "Creamy rice pudding",
      price: 124.19,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Kulfi",
      description: "Indian ice cream",
      price: 124.19,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Mango Lassi",
      description: "Yogurt-based drink flavored with mango",
      price: 109.69,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Strawberry Lassi",
      description: "Yogurt-based drink flavored with strawberry",
      price: 109.69,
      dietType: "VEG",
      category: "DESSERTS",
    },
    {
      name: "Sweet Lassi",
      description: "Sweet yogurt-based drink",
      price: 109.69,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Salted Lassi",
      description: "Salty yogurt-based drink",
      price: 109.69,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Masala Chai",
      description: "Spiced tea",
      price: 62.5,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Mango Juice",
      description: "Refreshing mango juice",
      price: 94.31,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 94.31,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Pepsi",
      description: "Refreshing cola drink",
      price: 32.11,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "7 Up",
      description: "Lemon-lime flavored soda",
      price: 32.11,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Soda",
      description: "Carbonated water",
      price: 32.11,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Coke",
      description: "Classic cola drink",
      price: 32.11,
      dietType: "VEG",
      category: "BEVERAGES",
    },
    {
      name: "Maaza",
      description: "Refreshing mango drink",
      price: 43.75,
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
