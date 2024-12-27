import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Enter a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(6, {
    message: 'Minimum 6 characters are required for the password',
  })
  password: string;
}
