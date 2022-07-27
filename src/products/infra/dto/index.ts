export interface CreateProductInputDTO {
  name: string;
  description: string;
  category: string;
  code: string;
  barcode: string;
  isActive: boolean;
}

export interface CreateProductOutputDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  barcode: string;
  isActive: boolean;
}

export interface ListProductsOutputDTO {
  products: CreateProductOutputDTO[];
}

export interface FindByNameProductsInputDTO {
  name: string;
}

export interface UpdateProductInputDTO {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  code?: string;
  barcode?: string;
  isActive?: boolean;
}
