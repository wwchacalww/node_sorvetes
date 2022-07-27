import { Product } from "./product";

describe("Product Entity Unit Test", () => {
  it("should create a new Product", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      code: "Code 1",
      barcode: "123456789",
      isActive: true,
    });
    expect(product).toBeTruthy();
    expect(product.id).toBeDefined();
    expect(product.isActive).toBeTruthy();

    product.deactivate();
    expect(product.isActive).toBeFalsy();
  });

  it("should update a Product", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      code: "Code 1",
      barcode: "123456789",
      isActive: true,
    });

    product.update({
      name: "Product 1 updated",
    });
    expect(product.name).toBe("Product 1 updated");
    expect(product.description).toBe("Product 1 description");
  });

  it("should throw an error when creating a new product with invalid props", async () => {
    expect(() => {
      new Product({} as any);
    }).toThrowError(
      "Product: Product name is required, Product: Description is required, Product: Category is required, Product: Barcode is required"
    );
    expect(() => {
      new Product({
        name: "Fu",
        description: "fu",
        category: "fu",
        code: "Co",
        barcode: "",
        isActive: false,
      });
    }).toThrowError(
      "Product: Product name must be at least 3 characters, Product: Category must be at least 3 characters, Product: Barcode is required, Product: Barcode must be at least 3 characters, Product: Code must be at least 3 characters"
    );
  });
});
