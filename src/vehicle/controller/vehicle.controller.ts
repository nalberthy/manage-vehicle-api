import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleService } from '../service/vehicle.service';
import { VehicleDto } from '../dto/vehicle.dto';
import { Brand, Vehicle } from '@prisma/client';

@Controller()
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get('vehicles')
  getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Get('vehicles/:vehicleId')
  getVehicle(@Param('vehicleId') vehicleId: number) {
    return this.vehicleService.getVehicles(Number(vehicleId));
  }

  @Get('brands')
  getBrands() {
    return this.vehicleService.getBrands();
  }

  @Get('brands/:brandId')
  getBrand(@Param('brandId') brandId: number) {
    return this.vehicleService.getBrands(Number(brandId));
  }

  @Post('vehicles')
  createVehicle(@Body() vehicle: VehicleDto) {
    return this.vehicleService.createVehicle(vehicle);
  }

  @Post('brands')
  createBrand(@Body() brand: Brand) {
    return this.vehicleService.createBrand(brand);
  }

  @Patch('vehicles/:vehicleId')
  updateVehicle(
    @Param('vehicleId') vehicleId: number,
    @Body() vehicle: Partial<Vehicle>,
  ) {
    return this.vehicleService.updateVehicle(Number(vehicleId), vehicle);
  }

  @Patch('brands/:brandId')
  updateBrand(
    @Param('brandId') brandId: number,
    @Body() brand: Partial<Brand>,
  ) {
    return this.vehicleService.updateBrand(Number(brandId), brand);
  }

  @Delete('vehicles/:vehicleId')
  deleteVehicle(@Param('vehicleId') vehicleId: number) {
    return this.vehicleService.deleteVehicle(Number(vehicleId));
  }

  @Delete('brands/:brandId')
  deleteBrand(@Param('brandId') brandId: number) {
    return this.vehicleService.deleteBrand(Number(brandId));
  }
}
