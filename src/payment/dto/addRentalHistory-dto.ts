import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddRentalHistoryDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  itemId: number;

  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsNotEmpty()
  @IsString()
  itemImage: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  rentalPeriod: number;
}
