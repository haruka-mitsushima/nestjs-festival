import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  prefecture: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @IsString()
  @IsOptional()
  building?: string;

  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  familyNameKana: string;

  @IsString()
  @IsNotEmpty()
  firstNameKana: string;

  @IsString()
  @IsNotEmpty()
  mailAddress: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
