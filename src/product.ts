export type Product = {
  name: string;
  price: number;
};

export const createProduct = (name: string, price: number): Product => {
  return { name, price };
};