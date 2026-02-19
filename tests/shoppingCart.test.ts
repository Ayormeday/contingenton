import { createProduct } from "../src/product";
import { createCart, addItem, getTotal } from "../src/shoppingCart";

// Test for adding product to cart then rounding price to 2 d.p
describe("Step 1 - Add products to shopping cart", () => {
  it("adds a product with the given quantity", () => {
    //initialize cart
    const cart = createCart();
    const dove = createProduct("Dove Soap", 39.99);

    const updatedCart = addItem(cart, dove, 5);

    expect(updatedCart.items).toHaveLength(1);
    expect(updatedCart.items[0].product).toEqual(dove);
    expect(updatedCart.items[0].quantity).toBe(5);
  });

  it("calculates total correctly to 2 decimal places", () => {
    const cart = createCart();
    const doveSoap = createProduct("Dove Soap", 39.99);

    const updatedCart = addItem(cart, doveSoap, 5);

    expect(getTotal(updatedCart)).toBe(199.95);
  });
});

describe("Step 2 - Add additional products of the same type", () => {
  it("accumulates quantity when the same product is added twice", () => {
    const cart = createCart();
    const doveSoap = createProduct("Dove Soap", 39.99);

    const initialCart = addItem(cart, doveSoap, 5);
    const finalCart = addItem(initialCart, doveSoap, 3);

    expect(finalCart.items).toHaveLength(1);
    expect(finalCart.items[0].quantity).toBe(8);
    expect(finalCart.items[0].product.name).toBe("Dove Soap");
    expect(finalCart.items[0].product.price).toBe(39.99);
  });

  it("calculates total correctly after accumulating quantities", () => {
    const cart = createCart();
    const doveSoap = createProduct("Dove Soap", 39.99);

    const initialCart = addItem(cart, doveSoap, 5);
    const finalCart = addItem(initialCart, doveSoap, 3);

    expect(getTotal(finalCart)).toBe(319.92);
  });
});
