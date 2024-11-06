import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserAuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password!: string;
}
