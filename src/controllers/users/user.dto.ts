import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class UpdateUserDTO {
  @IsString()
  @Length(2, 30)
  firstName?: string;

  @IsString()
  @Length(2, 30)
  lastName?: string;

  @IsEmail()
  email?: string;
}
