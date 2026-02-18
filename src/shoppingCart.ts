import { Product } from "./product";

type CartItem = {
  product: Product;
  quantity: number;
};

type ShoppingCart = {
  items: Array<CartItem>;
};

// Cart creation returns an array of items
const createCart = (): ShoppingCart => {
  return { items: [] };
};

const addItem = (cart: ShoppingCart, product: Product, quantity: number) => {
  return { items: [...cart.items, { product, quantity }] };
};

const getTotal = (cart: ShoppingCart): number => {
  return cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

export { CartItem, ShoppingCart, createCart, addItem, getTotal };
