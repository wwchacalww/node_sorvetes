import ValidatorInterface from "../../../@seedwork/validator/validator.interface";
import { Item } from "../entity/item";
import { ItemValidator } from "../validator/item.validator.yup";

export class ItemValidatorFactory {
  static create(): ValidatorInterface<Item> {
    return new ItemValidator();
  }
}
