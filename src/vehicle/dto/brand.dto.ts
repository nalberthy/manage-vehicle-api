import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BrandDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsString()
  year: string;
}
