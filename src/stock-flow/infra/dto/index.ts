export interface CreateItemInputDTO {
  product_id: string;
  quantity: number;
  status: string;
}

export interface CreateOrderInputDTO {
  type: string;
  status: string;
  items: CreateItemInputDTO[];
}
