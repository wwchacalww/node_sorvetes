import NotificationError from "../../../@seedwork/notification/notification.error";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { PriceValidatorFactory } from "../factory/price-validator.factory";

type PriceProps = {
  id?: string;
  product_id: string;
  price: number;
  cost: number;
  created_at?: Date;
};

export class Price extends Entity {
  private _product_id: string;
  private _price: number;
  private _cost: number;
  private _createdAt: Date;

  constructor(data: PriceProps) {
    super(data.id);
    this._product_id = data.product_id;
    this._price = data.price;
    this._cost = data.cost;
    this._createdAt = data.created_at || new Date();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get product_id() {
    return this._product_id;
  }

  get price() {
    return this._price;
  }

  get cost() {
    return this._cost;
  }

  get createdAt() {
    return this._createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      product_id: this.product_id,
      price: this.price,
      cost: this.cost,
      createdAt: this.createdAt,
    };
  }

  validate() {
    PriceValidatorFactory.create().validate(this);
  }
}
