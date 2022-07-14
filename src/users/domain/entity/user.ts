import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export class User {
  constructor(public readonly props: UserProps) {
    this.id = props.id || uuidV4();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static async create(props: UserProps) {
    const user = new User(props);
    user.id = uuidV4();
    user.password = await hash(user.password, 10);
    return user;
  }

  get id() {
    return this.props.id;
  }
  private set id(id: string) {
    this.props.id = id;
  }

  get name() {
    return this.props.name;
  }
  private set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }
  private set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }
  private set password(password: string) {
    this.props.password = password;
  }
  async changePassword(newPassword: string) {
    this.props.password = await hash(newPassword, 10);
  }
}
