import { createProduct } from "../src/product";
import { createCart, addItem, getTotal } from "../src/shoppingCart";
import { getSalesTax, getTotalWithTax } from "../src/shoppingCart";


// Step 1 - Test Cases
describe("Add products to shopping cart", () => {
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
// Step 2 - Test Cases
describe("Add additional products of the same type", () => {
  it("accumulates quantity when the same product is added twice", () => {
    const cart = createCart();
    const doveSoap = createProduct("Dove Soap", 39.99);

    const initialCart = addItem(cart, doveSoap, 5);
    const finalCart = addItem(initialCart, doveSoap, 3);

    expect(finalCart.items).toHaveLength(1); //update same product
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

// Step 3 will need new functions. We'll import them once they exist.
describe("Calculate tax with multiple items", () => {
  it("stores multiple products with correct quantities", () => {
    const cart = createCart();

    const doveSoap = createProduct("Dove Soap", 39.99);
    const axeDeo = createProduct("Axe Deo", 99.99);

    const cartAfterDove = addItem(cart, doveSoap, 2);
    const cartAfterAxe = addItem(cartAfterDove, axeDeo, 2);

    expect(cartAfterAxe.items).toHaveLength(2);

    const doveLine = cartAfterAxe.items.find(i => i.product.name === "Dove Soap");
    const axeLine = cartAfterAxe.items.find(i => i.product.name === "Axe Deo");

    expect(doveLine?.quantity).toBe(2);
    expect(doveLine?.product.price).toBe(39.99);

    expect(axeLine?.quantity).toBe(2);
    expect(axeLine?.product.price).toBe(99.99);
  });

  it("calculates sales tax at 12.5%", () => {
    const cart = createCart();

    const doveSoap = createProduct("Dove Soap", 39.99);
    const axeDeo = createProduct("Axe Deo", 99.99);

    const updated = addItem(addItem(cart, doveSoap, 2), axeDeo, 2);

    // subtotal should still be what we expect before tax
    expect(getTotal(updated)).toBe(279.96);

    const taxRate = 12.5;
    expect(getSalesTax(updated, taxRate)).toBe(35.0);
  });

  it("calculates total price including tax", () => {
    const cart = createCart();

    const doveSoap = createProduct("Dove Soap", 39.99);
    const axeDeo = createProduct("Axe Deo", 99.99);

    const updated = addItem(addItem(cart, doveSoap, 2), axeDeo, 2);

    const taxRate = 12.5;
    expect(getTotalWithTax(updated, taxRate)).toBe(314.96);
  });
});
