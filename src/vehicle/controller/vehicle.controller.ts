import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehicleService } from '../service/vehicle.service';
import { VehicleDto } from '../dto/vehicle.dto';

@Controller()
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  getVehicles() {
    console.log('getVehicles');
    return this.vehicleService.getVehicles();
  }

  @Get(':vehicleId')
  getVehicle(@Param('vehicleId') vehicleId: number) {
    return this.vehicleService.getVehicles(Number(vehicleId));
  }

  @Get('brands')
  getBrands() {
    console.log('getBrands');
    return this.vehicleService.getBrands();
  }

  @Get('brands/:brandId')
  getBrand(@Param('brandId') brandId: number) {
    return this.vehicleService.getBrands(Number(brandId));
  }

  @Post()
  createVehicle(@Body() vehicle: VehicleDto) {
    return this.vehicleService.createVehicle(vehicle);
  }
}
