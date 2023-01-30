import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  postTime: string;

  @IsString()
  @IsOptional()
  reviewTitle: string;

  @IsString()
  @IsOptional()
  reviewText: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  evaluation: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  spoiler: boolean;
}
