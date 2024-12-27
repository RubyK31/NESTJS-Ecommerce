import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone can not be empty' })
  @IsString({ message: 'Phone number should be a valid number' })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be a valid string' })
  name: string;

  @IsNotEmpty({ message: 'Address can not be empty' })
  @IsString({ message: 'Address should be a valid string' })
  address: string;

  @IsNotEmpty({ message: 'City can not be empty' })
  @IsString({ message: 'City should be a valid string' })
  city: string;

  @IsNotEmpty({ message: 'PostCode can not be empty' })
  @IsString({ message: 'PostCode should be a valid string' })
  postCode: string;

  @IsNotEmpty({ message: 'State can not be empty' })
  @IsString({ message: 'State should be a valid string' })
  state: string;

  @IsNotEmpty({ message: 'Country can not be empty' })
  @IsString({ message: 'Country should be a valid string' })
  country: string;
}
