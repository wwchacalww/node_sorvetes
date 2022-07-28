export interface CreateProductInputDTO {
  name: string;
  description: string;
  category: string;
  code: string;
  barcode: string;
  isActive: boolean;
}

export interface ProductOutputDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  barcode: string;
  isActive: boolean;
  price?: number;
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
  products: ProductOutputDTO[];
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

export interface SetProductPriceInputDTO {
  product_id: string;
  price: number;
  cost: number;
}

export interface SetProductPriceOutPutDTO {
  id: string;
  price: number;
  cost: number;
  createdAt: Date;
  Product: {
    id: string;
    name: string;
    description: string;
    category: string;
    code: string;
    barcode: string;
  };
}
