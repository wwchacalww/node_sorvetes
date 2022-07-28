import ValidatorInterface from "@seedwork/validator/validator.interface";
import { Price } from "../entity/price";
import * as yup from "yup";

export class PriceValidator implements ValidatorInterface<Price> {
  validate(entity: Price): void {
    try {
      yup
        .object()
        .shape({
          price: yup.number().required("Price is required"),
          cost: yup.number().required("Cost is required"),
        })
        .validateSync(
          {
            price: entity.price,
            cost: entity.cost,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "Price",
          message: error,
        });
      });
    }
  }
}
