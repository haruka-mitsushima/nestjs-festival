import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddLogedinCartDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  itemId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  rentalPeriod: number;
}
