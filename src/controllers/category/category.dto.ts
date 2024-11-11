import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsOptional()
  imageUrl?: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  imageUrl?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
