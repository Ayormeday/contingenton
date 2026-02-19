import { Product } from "./product";

// implementing rounding to 2 d.p function
const roundValue = (value: number): number => {
  return Math.round(value * 100) / 100;
};

//implementing duplicate check
const checkDuplicate = (productA: Product, productB: Product): boolean => {
  return productA.name === productB.name && productA.price === productB.price;
};

export { roundValue, checkDuplicate };
