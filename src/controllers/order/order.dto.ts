import { IsNotEmpty, IsString } from "class-validator";

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
