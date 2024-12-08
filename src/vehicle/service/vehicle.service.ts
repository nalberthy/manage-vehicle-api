import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicle.repository';
import { VehicleDto } from '../dto/vehicle.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  getVehicles(id?: number) {
    return this.vehicleRepository.getVehicles(id);
  }

  getBrands(id?: number) {
    return this.vehicleRepository.getBrands(id);
  }

  async createVehicle(data: VehicleDto) {
    const { id, name, model, year } = data.brand;
    const brandAssinged = await this.vehicleRepository.findBrand(
      id
        ? { id }
        : {
            name,
            model,
            year,
          },
    );

    let createVehicleData = { ...data } as Prisma.VehicleCreateInput;

    if (brandAssinged) {
      delete createVehicleData.brand;
      createVehicleData = {
        ...createVehicleData,
        brand: {
          connect: {
            id: brandAssinged.id,
          },
        },
      };
    } else {
      createVehicleData = {
        ...createVehicleData,
        brand: {
          create: data.brand,
        },
      };
    }
    return this.vehicleRepository.createVehicle(createVehicleData);
  }
}
