import ValidatorInterface from "../../../@seedwork/validator/validator.interface";
import { Price } from "../entity/price";
import { PriceValidator } from "../validator/price.validator.yup";

export class PriceValidatorFactory {
  static create(): ValidatorInterface<Price> {
    return new PriceValidator();
  }
}
