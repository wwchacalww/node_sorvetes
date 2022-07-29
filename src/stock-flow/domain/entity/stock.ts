import Entity from "../../../@seedwork/entity/entity.abstract";
import { Item } from "./item";

type StockProps = {
  id?: string;
  items: Item[];
  createdAt?: Date;
};

export class Stock extends Entity {
  private _items: Item[];
  private _createdAt: Date;

  constructor(data: StockProps) {
    super(data.id);
    this._items = data.items;
    this._createdAt = data.createdAt || new Date();
  }

  get id() {
    return this._id;
  }

  get items() {
    return this._items.map((item) => item.toJSON());
  }

  get totalCost() {
    return this._items.reduce((acc, item) => acc + item.totalCost(), 0);
  }

  get totalPrice() {
    return this._items.reduce((acc, item) => acc + item.totalPrice(), 0);
  }

  get createdAt() {
    return this._createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      items: this.items,
      totalCost: this.totalCost,
      totalPrice: this.totalPrice,
      createdAt: this.createdAt,
    };
  }

  addItem(item: Item) {
    this._items.push(item);
  }

  removeItem(item: Item) {
    this._items = this._items.filter((i) => i.id !== item.id);
  }
}
