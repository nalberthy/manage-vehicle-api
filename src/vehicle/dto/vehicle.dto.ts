import { IsString } from 'class-validator';
import { BrandDto } from './brand.dto';
import { Type } from 'class-transformer';

export class VehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  chassis: string;

  @IsString()
  renavam: string;

  @Type(() => BrandDto)
  brand: BrandDto;
}
