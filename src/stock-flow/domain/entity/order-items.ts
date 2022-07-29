import Entity from "../../../@seedwork/entity/entity.abstract";
import { Item } from "./item";

type OrderItemsProps = {
  id?: string;
  items: Item[];
  type: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class OrderItems extends Entity {
  private _items: Item[];
  private _type: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: OrderItemsProps) {
    super(data.id);
    this._items = data.items;
    this._type = data.type;
    this._status = data.status;
    this._createdAt = data.createdAt || new Date();
    this._updatedAt = data.updatedAt || new Date();
  }

  get id() {
    return this._id;
  }

  get items() {
    return this._items.map((item) => item.toJSON());
  }

  get type() {
    return this._type;
  }
  set type(type: string) {
    this._type = type;
  }

  get status() {
    return this._status;
  }
  set status(status: string) {
    this._status = status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  get totalCost() {
    return this._items.reduce((acc, item) => acc + item.totalCost(), 0);
  }

  get totalPrice() {
    return this._items.reduce((acc, item) => acc + item.totalPrice(), 0);
  }

  toJSON() {
    return {
      id: this.id,
      items: this.items,
      type: this.type,
      status: this.status,
      totalCost: this.totalCost,
      totalPrice: this.totalPrice,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  addItem(item: Item) {
    this._items.push(item);
  }
}
