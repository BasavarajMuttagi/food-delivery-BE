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

type OrderItem = {
  itemId: string;
  quantity: number;
  menuItem: {
    description: string;
    dietType: "VEG" | "NON_VEG";
    imageUrl: string;
    name: string;
  };
};

export { Discount, DiscountResult, Item, OrderItem, QuoteType };
