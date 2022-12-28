import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export interface User {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}
