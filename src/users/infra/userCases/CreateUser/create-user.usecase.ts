import { inject, injectable } from "tsyringe";
import { User } from "users/domain/entity/user";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";

export interface CreateUserInputDTO {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface CreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}

  public async execute(
    props: CreateUserInputDTO
  ): Promise<CreateUserOutputDTO> {
    const entity = new User(props);
    const user = await this.userRepository.create(entity);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
