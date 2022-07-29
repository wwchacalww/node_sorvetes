import { Price } from "../../../products/domain/entity/price";
import { Product } from "../../../products/domain/entity/product";
import { Item } from "./item";

describe("Item Entity Unit Test", () => {
  it("should create a new Item", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      barcode: "123456789",
      code: "P10",
      isActive: true,
    });

    const price = new Price({
      cost: 4.5,
      price: 6.5,
      product_id: product.id,
    });

    product.addPrice(price);

    const item = new Item({
      product,
      quantity: 2,
      status: "EM ESTOQUE",
    });

    expect(item.product).toBe(product);
    expect(item.totalCost()).toBe(9);
    expect(item.totalPrice()).toBe(13);
    expect(item.status).toBe("EM ESTOQUE");

    item.status = "VENDIDO";
    expect(item.status).toBe("VENDIDO");
  });

  it("should throw an error when creating a new Item", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      barcode: "123456789",
      code: "P10",
      isActive: true,
    });

    const price = new Price({
      cost: 4.5,
      price: 6.5,
      product_id: product.id,
    });

    product.addPrice(price);

    expect(() => {
      new Item({
        product,
        quantity: 0,
        status: "",
      });
    }).toThrowError("Item: Quantity must be at least 1");
  });
});
