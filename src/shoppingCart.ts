import { Product } from "./product";
import { roundValue, checkDuplicate } from "./helper";

type CartItem = {
  product: Product;
  quantity: number;
};

type ShoppingCart = {
  items: Array<CartItem>;
};

// Cart Initiation 
const createCart = (): ShoppingCart => {
  return { items: [] };
};

const addItem = (cart: ShoppingCart, product: Product, quantity: number): ShoppingCart => {
  const existingIndex = cart.items.findIndex((item) => checkDuplicate(item.product, product));

  // If product not already in cart, create a new line item
  if (existingIndex === -1) {
    return { items: [...cart.items, { product, quantity }] };
  }

  // else, replace product with accumulated quantity
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

const getTotal = (cart: ShoppingCart): number => {
  const unitTotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  // call rounder function
  return roundValue(unitTotal);
};

// implementing rounding to 2 d.p function

export { CartItem, ShoppingCart, createCart, addItem, getTotal };
