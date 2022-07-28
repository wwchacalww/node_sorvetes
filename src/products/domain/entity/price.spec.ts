import { Price } from "./price";

describe("Price Entity Unit Test", () => {
  it("should create a new Price", () => {
    const price = new Price({
      product_id: "product_id",
      price: 1.55,
      cost: 1.45,
    });
    expect(price).toBeTruthy();
    expect(price.id).toBeDefined();
    expect(price.product_id).toBe("product_id");
    expect(price.price).toBe(1.55);
    expect(price.cost).toBe(1.45);
  });

  it("should throw an error when creating a new price with invalid props", async () => {
    expect(() => {
      new Price({} as any);
    }).toThrowError("Price: Price is required, Price: Cost is required");
  });
});
