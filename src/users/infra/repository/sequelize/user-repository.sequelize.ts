import NotificationError from "../../../../@seedwork/notification/notification.error";
import { hash } from "bcrypt";
import { User } from "../../../domain/entity/user";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import UserModel from "./user-model.sequelize";

export class UserRepository implements UserRepositoryInterface {
  private userModel: typeof UserModel;
  constructor() {
    this.userModel = UserModel;
  }

  async create(entity: User): Promise<User> {
    const { id, name, email, password, isAdmin } = entity;

    const passwordHash = await hash(password, 10);
    await this.userModel.create({
      id,
      name,
      email,
      password: passwordHash,
      isAdmin,
    });
    return entity;
  }

  async update(entity: User): Promise<User> {
    const { id, password } = entity;
    const passwordHash = await hash(password, 10);
    await this.userModel.update(
      {
        password: passwordHash,
      },
      {
        where: {
          id,
        },
      }
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const userRepo = await this.userModel.findByPk(id);
    return new User({
      id: userRepo.id,
      name: userRepo.name,
      email: userRepo.email,
      password: userRepo.password,
      isAdmin: userRepo.isAdmin,
    });
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.findAll();
    return result.map(
      (userRepo) =>
        new User({
          id: userRepo.id,
          name: userRepo.name,
          email: userRepo.email,
          password: userRepo.password,
          isAdmin: userRepo.isAdmin,
        })
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userRepo = await this.userModel.findOne({
      where: { email },
    });

    if (userRepo) {
      return new User({
        id: userRepo.id,
        name: userRepo.name,
        email: userRepo.email,
        password: userRepo.password,
        isAdmin: userRepo.isAdmin,
      });
    }

    return undefined;
  }
}
