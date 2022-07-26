import ValidatorInterface from "../../../@seedwork/validator/validator.interface";
import { Product } from "../entity/product";
import { ProductValidator } from "../validator/product.validator.yup";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductValidator();
  }
}
