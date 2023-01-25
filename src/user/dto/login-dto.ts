import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  mailAddress: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
