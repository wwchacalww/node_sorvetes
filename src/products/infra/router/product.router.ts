import { Router } from "express";
import { ensureAuthenticate } from "infra/middleware/ensureAuthenticate";
import { CreateProductController } from "../usecases/CreateProduct/create-product.controller";
import { FindByCodeProductController } from "../usecases/FindByCode/find-by-code-product.controller";
import { FindByBarcodeProductController } from "../usecases/FindByBarcode/find-by-barcode-product.controller";
import { FindByNameProductsController } from "../usecases/FindByName/find-by-name-products.controller";
import { ListProductsController } from "../usecases/ListProducts/list-products.controller";
import { FindByIdProductController } from "../usecases/FindById/find-by-id-product.controller";
import { UpdateProductController } from "../usecases/UpdateProduct/update-product.constroller";
import { DeleteProductController } from "../usecases/DeleteProduct/delete-product.controller";

const productRouter = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const findByNameProductsController = new FindByNameProductsController();
const findByCodeProductController = new FindByCodeProductController();
const findByBarcodeProductController = new FindByBarcodeProductController();
const findByIdProductController = new FindByIdProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productRouter.post("/", ensureAuthenticate, createProductController.handle);
productRouter.get("/", ensureAuthenticate, listProductsController.handle);
productRouter.get(
  "/search/",
  ensureAuthenticate,
  findByNameProductsController.handle
);
productRouter.get(
  "/code/",
  ensureAuthenticate,
  findByCodeProductController.handle
);
productRouter.get(
  "/barcode/",
  ensureAuthenticate,
  findByBarcodeProductController.handle
);
productRouter.get("/:id", ensureAuthenticate, findByIdProductController.handle);
productRouter.put("/", ensureAuthenticate, updateProductController.handle);
productRouter.delete(
  "/:id",
  ensureAuthenticate,
  deleteProductController.handle
);

export { productRouter };
