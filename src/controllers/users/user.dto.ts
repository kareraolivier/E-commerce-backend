import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";

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

  @IsString()
  @IsNotEmpty()
  // Password should have at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,30}$/)
  password!: string;
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

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,30}$/)
  password?: string;

  @IsBoolean()
  isActive?: boolean;
}
