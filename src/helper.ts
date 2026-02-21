import { Product } from "./product";

//Check Duplicates by Product name
const checkDuplicate = (productA: Product, productB: Product): boolean => {
  return productA.name === productB.name && productA.price === productB.price;
};

// Tax conversion functions
const convertFromPercent = (amount: number): number => {
  return Math.round(amount * 100);
};

const convertToPercent = (cents: number): number => {
  return Number((cents / 100).toFixed(2));
};

export { checkDuplicate, convertFromPercent, convertToPercent };
