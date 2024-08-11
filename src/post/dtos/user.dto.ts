import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewUserDto {
  id: number;

  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
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
