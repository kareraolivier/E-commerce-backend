import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class createProductDto {
  @IsString()
  @Length(2, 80)
  title!: string;
  @IsString()
  description!: string;
  @IsString()
  @Length(2, 30)
  price!: number;
  @IsString()
  @IsUUID()
  categoryId!: number;
  @IsString()
  @IsOptional()
  imageUrl!: string;
}

export class updateProductDto {
  @IsString()
  @IsOptional()
  @Length(2, 80)
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  @Length(2, 30)
  price?: number;
  @IsString()
  @IsOptional()
  @IsUUID()
  categoryId?: number;
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
