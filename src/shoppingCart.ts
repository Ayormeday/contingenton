import { Product } from "./product";
import { convertFromPercent, convertToPercent, checkDuplicate } from "./helper";

type CartItem = {
  product: Product;
  quantity: number;
};

type ShoppingCart = {
  items: Array<CartItem>;
};

const createCart = (): ShoppingCart => {
  return { items: [] };
};

const addItem = (cart: ShoppingCart, product: Product, quantity: number): ShoppingCart => {
  const existingIndex = cart.items.findIndex((item) => checkDuplicate(item.product, product));

  if (existingIndex === -1) {
    return { items: [...cart.items, { product, quantity }] };
  }

  const existingItem = cart.items[existingIndex];
  const updatedItem: CartItem = {
    product: existingItem.product,
    quantity: existingItem.quantity + quantity,
  };

  const updatedItems = cart.items.map((item, index) =>
    index === existingIndex ? updatedItem : item
  );

  return { items: updatedItems };
};

const getSubtotal = (cart: ShoppingCart): number => {
  return cart.items.reduce((total, item) => {
    const price = convertFromPercent(item.product.price);
    return total + price * item.quantity;
  }, 0);
};

const getTotal = (cart: ShoppingCart): number => {
  return convertToPercent(getSubtotal(cart));
};

// taxRatePercent is passed as 12.5 for 12.5%
const getSalesTax = (cart: ShoppingCart, taxRatePercent: number): number => {
  const subTotal = getSubtotal(cart);

  // Convert percent to basis points (two decimals of a percent)
  // 12.5% = 1250 
  const rate = Math.round(taxRatePercent * 100);

  // tax = subTotal * rate / 10000, rounded to nearest basepoint
  const tax = Math.round((subTotal * rate) / 10000);

  return convertToPercent(tax);
};

const getTotalWithTax = (cart: ShoppingCart, taxRatePercent: number): number => {
  const subTotal = getSubtotal(cart);
  const rate = Math.round(taxRatePercent * 100);
  const tax = Math.round((subTotal * rate) / 10000);

  return convertToPercent(subTotal + tax);
};

export {
  CartItem,
  ShoppingCart,
  createCart,
  addItem,
  getTotal,
  getSalesTax,
  getTotalWithTax,
};