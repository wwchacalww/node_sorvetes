import { Price } from "../../../products/domain/entity/price";
import { Product } from "../../../products/domain/entity/product";
import { Item } from "./item";
import { Stock } from "./stock";

describe("Stock Entity Unit Test", () => {
  it("should register items into stock", () => {
    const product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      barcode: "123456789",
      code: "P10",
      isActive: true,
    });

    const price = new Price({
      cost: 3,
      price: 6,
      product_id: product.id,
    });

    product.addPrice(price);

    const item = new Item({
      product,
      quantity: 10,
      status: "EM ESTOQUE",
    });

    const product2 = new Product({
      name: "Product 2",
      description: "Product 2 description",
      category: "Category 2",
      barcode: "1234567829",
      code: "P20",
      isActive: true,
    });

    const price2 = new Price({
      cost: 2,
      price: 4,
      product_id: product2.id,
    });

    product2.addPrice(price2);

    const item2 = new Item({
      product: product2,
      quantity: 3,
      status: "EM ESTOQUE",
    });

    const stock = new Stock({
      items: [item, item2],
    });

    expect(stock.items.length).toBe(2);
    expect(stock.totalCost).toBe(36);
    expect(stock.totalPrice).toBe(72);
  });
});
