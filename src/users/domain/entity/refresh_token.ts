import { v4 } from "uuid";
import Entity from "../../../@seedwork/entity/entity.abstract";
import { User } from "./user";

type RefreshTokenProps = {
  user: User;
};

export class RefreshToken extends Entity {
  private _token: string;
  private _user: User;
  private _expires_at: Date;
  private _created_at: Date;

  constructor({ user }: RefreshTokenProps) {
    super();
    this._token = v4();
    this._user = user;
    this._created_at = new Date();
    this._expires_at = new Date(
      this._created_at.getTime() + 1000 * 60 * 60 * 3 // 3 hours
    );
  }

  get token() {
    return this._token;
  }

  get user() {
    return this._user;
  }

  get expires_at() {
    return this._expires_at;
  }

  get created_at() {
    return this._created_at;
  }

  toJSON() {
    return {
      token: this.token,
      user: this.user.toJSON(),
      expires_at: this.expires_at,
      created_at: this.created_at,
    };
  }
}
