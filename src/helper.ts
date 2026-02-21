import { Product } from "./product";

// Round to 2 d.p function
// const roundValue = (value: number): number => {
//   return Math.round(value * 100) / 100;
//   return Number(value.toFixed(2)); 
// };

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
