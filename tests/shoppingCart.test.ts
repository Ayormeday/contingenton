import { createProduct } from "../src/product";
import { createCart, addItem, getTotal } from "../src/shoppingCart";

describe("Step 1 - Add products to shopping cart", () => {
    it("adds a product with the given quantity", () => {
      //initialize cart
    const cart = createCart();
    const dove = createProduct("Dove Soap", 39.99);

    const updated = addItem(cart, dove, 5);

    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].product).toEqual(dove);
    expect(updated.items[0].quantity).toBe(5);
  });

  it("calculates total correctly to 2 decimal places", () => {
    const cart = createCart();
    const doveSoap = createProduct("Dove Soap", 39.99);

    const updatedCart = addItem(cart, doveSoap, 5);

    expect(getTotal(updatedCart)).toBe(199.95);
  });
});
