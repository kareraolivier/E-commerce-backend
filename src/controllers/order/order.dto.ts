import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  date!: Date;
  @IsString()
  @IsNotEmpty()
  totalAmount!: string;
  @IsString()
  @IsNotEmpty()
  status!: string;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}

export class UpdateOrderDTO {
  @IsString()
  @IsNotEmpty()
  date?: Date;
  @IsString()
  @IsNotEmpty()
  totalAmount?: number;
  @IsString()
  @IsNotEmpty()
  status?: number;
}
