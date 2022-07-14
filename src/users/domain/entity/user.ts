import NotificationError from "../../../@seedwork/notification/notification.error";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { UserValidatorFactory } from "../factory/user.validator.factory";

type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _isAdmin: boolean;

  constructor({ id, name, email, password, isAdmin }: UserProps) {
    super(id);
    this._name = name;
    this._email = email;
    this._password = password;
    this._isAdmin = isAdmin || false;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id() {
    return this._id;
  }
  private set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  private set name(name: string) {
    this._name = name;
  }

  get email() {
    return this._email;
  }
  private set email(email: string) {
    this._email = email;
  }

  get password() {
    return this._password;
  }
  private set password(password: string) {
    this._password = password;
  }
  changePassword(newPassword: string) {
    this._password = newPassword;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      isAdmin: this._isAdmin,
    };
  }

  validate() {
    UserValidatorFactory.create().validate(this);
  }
}
