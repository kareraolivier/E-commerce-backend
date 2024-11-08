import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpdateCategoryDTO {
  @IsString()
  name?: string;
  @IsString()
  description?: string;
  @IsBoolean()
  isActive?: boolean;
}
