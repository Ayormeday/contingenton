import { Product } from "./product";

// Round to 2 d.p function
const roundValue = (value: number): number => {
  return Math.round(value * 100) / 100;
};

//Check Duplicates by Product name
const checkDuplicate = (productA: Product, productB: Product): boolean => {
  return productA.name === productB.name && productA.price === productB.price;
};

export { roundValue, checkDuplicate };
