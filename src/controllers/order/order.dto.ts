import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  date!: number;
  @IsString()
  @IsNotEmpty()
  totalAmount!: number;
  @IsString()
  @IsNotEmpty()
  status!: number;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}

export class UpdateOrderDTO {
  @IsString()
  @IsNotEmpty()
  date?: number;
  @IsString()
  @IsNotEmpty()
  totalAmount?: number;
  @IsString()
  @IsNotEmpty()
  status?: number;
}
