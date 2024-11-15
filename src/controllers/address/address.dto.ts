import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  street!: string;
  @IsUUID()
  userId!: string;
  @IsString()
  city!: string;
  @IsString()
  state!: string;
  @IsString()
  country!: string;
  @IsString()
  zipCode!: number;
}

export class UpdateAddressDTO {
  street?: string;
  @IsUUID()
  userId?: string;
  @IsString()
  city?: string;
  @IsString()
  state?: string;
  @IsString()
  country?: string;
  @IsString()
  zipCode?: number;
}
