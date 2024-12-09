import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicle.repository';
import { VehicleDto } from '../dto/vehicle.dto';
import { Prisma } from '@prisma/client';
import { VehicleErrors } from '../exception/vehicle.erros';

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
    const isVehicle = await this.vehicleRepository.findVehicle(data);

    if (isVehicle) {
      throw VehicleErrors.VEHICLE_ALREADY_EXISTS();
    }

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
    return await this.vehicleRepository.createVehicle(createVehicleData);
  }

  async createBrand(data: Prisma.BrandCreateInput) {
    const { name, model, year } = data;
    const isVehicle = await this.vehicleRepository.findBrand({
      name,
      model,
      year,
    });

    if (isVehicle) {
      throw VehicleErrors.BRAND_ALREADY_EXISTS();
    }

    return this.vehicleRepository.createBrand(data);
  }

  updateVehicle(vehicleId: number, data: Prisma.VehicleUpdateInput) {
    return this.vehicleRepository.updateVehicle(vehicleId, data);
  }

  updateBrand(brandId: number, data: Prisma.BrandUpdateInput) {
    return this.vehicleRepository.updateBrand(brandId, data);
  }

  deleteVehicle(id: number) {
    return this.vehicleRepository.deleteVehicle(id);
  }

  deleteBrand(id: number) {
    return this.vehicleRepository.deleteBrand(id);
  }
}
