import ValidatorInterface from "@seedwork/validator/validator.interface";
import { User } from "../entity/user";
import * as yup from "yup";

export class UserValidator implements ValidatorInterface<User> {
  validate(entity: User): void {
    try {
      yup
        .object()
        .shape({
          name: yup
            .string()
            .required("User name is required")
            .min(3, "User name must be at least 3 characters")
            .max(50, "User name must be at most 50 characters"),
          email: yup.string().required("User email is required").email(),
          password: yup
            .string()
            .required("User password is required")
            .min(6, "User password must be at least 6 characters"),
        })
        .validateSync(
          {
            name: entity.name,
            email: entity.email,
            password: entity.password,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "User",
          message: error,
        });
      });
    }
  }
}
