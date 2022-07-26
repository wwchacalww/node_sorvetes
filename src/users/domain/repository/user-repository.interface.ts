import RepositoryInterface from "@seedwork/repository/repository.interface";
import { User } from "../entity/user";

export default interface UserRepositoryInterface
  extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | undefined>;
  createRefreshToken(user_id: string): Promise<string>;
  checkRefreshTokenIsValid(user_id: string, token: string): Promise<boolean>;
  invalidateRefreshToken(token: string): Promise<void>;
}
