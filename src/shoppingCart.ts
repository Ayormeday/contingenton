import { Product } from "./product";

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

const addItem = (cart: ShoppingCart, product: Product, quantity: number) => {
  return { items: [...cart.items, { product, quantity }] };
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
const roundValue = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export { CartItem, ShoppingCart, createCart, addItem, getTotal };
