import ValidatorInterface from "../../../@seedwork/validator/validator.interface";
import { User } from "../entity/user";
import { UserValidator } from "../validator/user.validator.yup";

export class UserValidatorFactory {
  static create(): ValidatorInterface<User> {
    return new UserValidator();
  }
}
