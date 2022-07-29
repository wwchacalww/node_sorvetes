import ValidatorInterface from "@seedwork/validator/validator.interface";
import * as yup from "yup";
import { Item } from "../entity/item";

export class ItemValidator implements ValidatorInterface<Item> {
  validate(entity: Item): void {
    try {
      yup
        .object()
        .shape({
          quantity: yup
            .number()
            .required("Quantity is required")
            .min(1, "Quantity must be at least 1"),
          status: yup.string().required("Status is required"),
        })
        .validateSync(
          {
            quantity: entity.quantity,
            status: entity.status,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "Item",
          message: error,
        });
      });
    }
  }
}
