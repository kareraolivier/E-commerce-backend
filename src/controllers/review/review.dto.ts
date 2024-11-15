import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from "class-validator";

export class CreateReviewDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId!: string;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
  @IsNumber()
  rating!: number;
  @IsString()
  comment!: string;
}

export class UpdateReviewDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productId?: string;
  @IsNumber()
  @IsOptional()
  rating?: number;
  @IsString()
  @IsOptional()
  comment?: string;
}
