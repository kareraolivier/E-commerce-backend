import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;
}

export class UpdateCategoryDTO {
  @IsString()
  name?: string;
  @IsBoolean()
  isActive?: boolean;
}
