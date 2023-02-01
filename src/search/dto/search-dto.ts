import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  keyword: string | undefined;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  genre: number;

  @IsString()
  @IsNotEmpty()
  orderBy: string;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  take: number;
}
