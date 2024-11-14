import { IsString, isUUID } from "class-validator";

export class CreateOrderItemDTO {
  @IsString()
  quantity!: number;
  @IsString()
  productId!: string;
  @IsString()
  orderId!: string;
}

export class UpdateOrderItemDTO {
  @IsString()
  quantity?: number;
  @IsString()
  productId?: string;
  @IsString()
  orderId?: string;
}

export class DeleteOrderItemDTO {
  @IsString()
  id!: string;
}
