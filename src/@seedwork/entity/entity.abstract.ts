import Notification from "../notification/notification";
import { v4 as uuidV4 } from "uuid";

export default abstract class Entity {
  protected _id: string;
  public notification: Notification;

  constructor(id?: string) {
    this._id = id || uuidV4();
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
