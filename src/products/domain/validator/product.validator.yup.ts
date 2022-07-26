import ValidatorInterface from "../../../@seedwork/validator/validator.interface";
import * as yup from "yup";
import { Product } from "../entity/product";

export class ProductValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          name: yup
            .string()
            .required("Product name is required")
            .min(3, "Product name must be at least 3 characters")
            .max(50, "Product name must be at most 50 characters"),
          description: yup.string().required("Description is required"),
          category: yup
            .string()
            .required("Category is required")
            .min(3, "Category must be at least 3 characters")
            .max(20, "Category must be at most 20 characters"),
          barcode: yup
            .string()
            .required("Barcode is required")
            .min(3, "Barcode must be at least 3 characters")
            .max(20, "Barcode must be at most 20 characters"),
          isActive: yup.boolean().required("IsActive is required"),
        })
        .validateSync(
          {
            name: entity.name,
            description: entity.description,
            category: entity.category,
            barcode: entity.barcode,
            isActive: entity.isActive,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "Product",
          message: error,
        });
      });
    }
  }
}
