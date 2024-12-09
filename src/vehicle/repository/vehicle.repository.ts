import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehicleRepository {
  constructor(private prisma: PrismaService) {}

  getVehicles(id?: number) {
    if (id) {
      return this.prisma.vehicle.findUnique({
        where: { id },
        include: {
          brand: true,
        },
      });
    }
    return this.prisma.vehicle.findMany({ include: { brand: true } });
  }

  async getBrands(id?: number) {
    if (id) {
      return this.prisma.brand.findUnique({
        where: { id },
      });
    }
    return this.prisma.brand.findMany();
  }

  findBrand(filter: Partial<Prisma.BrandWhereUniqueInput>) {
    return this.prisma.brand.findFirst({
      where: filter,
    });
  }

  createVehicle(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({
      data,
      include: {
        brand: true,
      },
    });
  }

  createBrand(data: Prisma.BrandCreateInput) {
    return this.prisma.brand.create({
      data,
    });
  }

  updateVehicle(id: number, data: Prisma.VehicleUpdateInput) {
    return this.prisma.vehicle.update({
      where: { id },
      data,
      include: {
        brand: true,
      },
    });
  }

  updateBrand(id: number, data: Prisma.BrandUpdateInput) {
    return this.prisma.brand.update({
      where: { id },
      data,
    });
  }

  deleteVehicle(id: number) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }

  deleteBrand(id: number) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
