import { Price } from "./price";
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

  test("props price", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      code: "Code 1",
      barcode: "123456789",
      isActive: true,
    });
    expect(product.value()).toBeNull();

    const priceFev = new Price({
      cost: 3.4,
      price: 5.0,
      product_id: product.id,
    });
    priceFev["_createdAt"] = new Date(2022, 1, 22, 12, 0, 0);

    const priceMar = new Price({
      cost: 3.8,
      price: 5.5,
      product_id: product.id,
    });
    priceMar["_createdAt"] = new Date(2022, 2, 22, 12, 0, 0);

    const priceJun = new Price({
      cost: 4,
      price: 6.5,
      product_id: product.id,
    });
    priceJun["_createdAt"] = new Date(2022, 5, 22, 12, 0, 0);

    product.addPrice(priceJun);
    product.addPrice(priceFev);
    product.addPrice(priceMar);

    const dataFev = new Date(2022, 1, 23, 12, 0, 0);
    const dataMar = new Date(2022, 2, 23, 12, 0, 0);
    const dataJun = new Date(2022, 5, 23, 12, 0, 0);

    expect(product.value(dataFev)).toEqual(priceFev);
    expect(product.value(dataMar)).toEqual(priceMar);
    expect(product.value(dataJun)).toEqual(priceJun);
  });
});
