import { IsString, IsUUID } from "class-validator";

export class CreateOrderItemDTO {
  @IsString()
  quantity!: number;
  @IsString()
  @IsUUID()
  productId!: string;
  @IsString()
  @IsUUID()
  orderId!: string;
  @IsString()
  amount!: string;
}

export class UpdateOrderItemDTO {
  @IsString()
  quantity?: number;
  @IsString()
  @IsUUID()
  productId?: string;
  @IsString()
  @IsUUID()
  orderId?: string;
  @IsString()
  amount?: string;
}

export class DeleteOrderItemDTO {
  @IsString()
  @IsUUID()
  id!: string;
}
