import NotificationError from "../../../@seedwork/notification/notification.error";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { Product } from "../../../products/domain/entity/product";
import { ItemValidatorFactory } from "../factory/item-validator.factory";

type ItemProps = {
  id?: string;
  product: Product;
  quantity: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Item extends Entity {
  private _product: Product;
  private _quantity: number;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: ItemProps) {
    super(data.id);
    this._product = data.product;
    this._quantity = data.quantity;
    this._status = data.status;
    this._createdAt = data.createdAt || new Date();
    this._updatedAt = data.updatedAt || new Date();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id() {
    return this._id;
  }

  get product() {
    return this._product;
  }

  get quantity() {
    return this._quantity;
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

  totalCost() {
    return this.product.value(this._createdAt).cost * this.quantity;
  }

  totalPrice() {
    return this.product.value(this._createdAt).price * this.quantity;
  }

  toJSON() {
    return {
      id: this.id,
      product: this.product.name,
      quantity: this.quantity,
      price: this.product.value(this._createdAt).price,
      cost: this.product.value(this._createdAt).cost,
      status: this.status,
      date: this._updatedAt,
      totalCost: this.totalCost(),
      totalPrice: this.totalPrice(),
      product_id: this.product.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  validate() {
    ItemValidatorFactory.create().validate(this);
  }
}
