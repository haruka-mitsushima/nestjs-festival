import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Type(() => Number)
  itemId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsString()
  @IsNotEmpty()
  postTime: string;

  @IsString()
  @IsNotEmpty()
  reviewTitle: string;

  @IsString()
  @IsNotEmpty()
  reviewText: string;

  @IsInt()
  @Type(() => Number)
  evaluation: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  spoiler: boolean;
}
