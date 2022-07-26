import NotificationError from "../../../@seedwork/notification/notification.error";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { ProductValidatorFactory } from "../factory/product-validator.factory";

type ProductProps = {
  id?: string;
  name: string;
  description: string;
  category: string;
  barcode: string;
  isActive: boolean;
};

export class Product extends Entity {
  private _name: string;
  private _description: string;
  private _category: string;
  private _barcode: string;
  private _isActive: boolean;

  constructor(data: ProductProps) {
    super(data.id);
    this._name = data.name;
    this._description = data.description;
    this._category = data.category;
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
