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
    return this.prisma.vehicle.findMany();
  }

  async getBrands(id?: number) {
    if (id) {
      return this.prisma.brand.findUnique({
        where: { id },
      });
    }
    console.log('getBrands', await this.prisma.brand.findMany());
    return this.prisma.brand.findMany();
  }

  createVehicle(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({
      data,
      include: {
        brand: true,
      },
    });
  }

  findBrand(filter: Partial<Prisma.BrandWhereUniqueInput>) {
    return this.prisma.brand.findFirst({
      where: filter,
    });
  }
}
