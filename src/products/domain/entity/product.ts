import NotificationError from "../../../@seedwork/notification/notification.error";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { ProductValidatorFactory } from "../factory/product-validator.factory";
import { Price } from "./price";

type ProductProps = {
  id?: string;
  name: string;
  description: string;
  category: string;
  code: string;
  barcode: string;
  isActive: boolean;
};

type ProductPropsUpdate = {
  name?: string;
  description?: string;
  category?: string;
  code?: string;
  barcode?: string;
  isActive?: boolean;
};

export class Product extends Entity {
  private _name: string;
  private _description: string;
  private _category: string;
  private _code: string;
  private _barcode: string;
  private _isActive: boolean;
  private _prices: Price[] = [];

  constructor(data: ProductProps) {
    super(data.id);
    this._name = data.name;
    this._description = data.description;
    this._category = data.category;
    this._code = data.code;
    this._barcode = data.barcode;
    this._isActive = data.isActive || false;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id() {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get description() {
    return this._description;
  }
  set description(description: string) {
    this._description = description;
  }

  get category() {
    return this._category;
  }
  set category(category: string) {
    this._category = category;
  }

  get code() {
    return this._code;
  }
  set code(code: string) {
    this._code = code;
  }

  get barcode() {
    return this._barcode;
  }
  set barcode(barcode: string) {
    this._barcode = barcode;
  }

  get isActive() {
    return this._isActive;
  }
  activate() {
    this._isActive = true;
  }
  deactivate() {
    this._isActive = false;
  }

  value(date: Date = new Date()) {
    if (this._prices.length === 0) {
      return null;
    }
    const prices = this._prices.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const result = prices.find(
      (price) => price.createdAt.getTime() <= date.getTime()
    );

    return result;
  }
  addPrice(price: Price) {
    this._prices.push(price);
  }

  update(data: ProductPropsUpdate) {
    this.name = data.name || this.name;
    this.description = data.description || this.description;
    this.category = data.category || this.category;
    this.code = data.code || this.code;
    this.barcode = data.barcode || this.barcode;
    if (data.isActive === true) {
      this.activate();
    }
    if (data.isActive === false) {
      this.deactivate();
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      barcode: this.barcode,
      isActive: this.isActive,
    };
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
  }
}
