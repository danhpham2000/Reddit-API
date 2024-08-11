import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class NewUserDto {
  id: number;

  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 7,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;

  subbredditId: number;
}

export class CurrentUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
