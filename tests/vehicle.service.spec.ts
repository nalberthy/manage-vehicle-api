import { VehicleService } from '../src/vehicle/service/vehicle.service';
import { VehicleRepository } from '../src/vehicle/repository/vehicle.repository';
import { PrismaService } from '../src/prisma/prisma.service';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Prisma } from '@prisma/client';

const vehiclesList: Prisma.VehicleGetPayload<{ include: { brand: true } }>[] = [
  {
    id: 1,
    licensePlate: 'ABC1234',
    chassis: 'XYZ5678',
    renavam: '123456789',
    brandId: 1,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    brand: {
      id: 1,
      name: 'Toyota',
      model: 'Corolla',
      year: '2020',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    },
  },
  {
    id: 2,
    licensePlate: 'DEF5678',
    chassis: 'UVW1234',
    renavam: '987654321',
    brandId: 2,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    brand: {
      id: 2,
      name: 'Honda',
      model: 'Civic',
      year: '2021',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    },
  },
];

const prismaService = new PrismaService();
sinon.stub(prismaService);
const vehicleRepository = new VehicleRepository(prismaService);
const vehicleService = new VehicleService(vehicleRepository);

describe('VehicleService', () => {
  describe('getVehicles', () => {
    it('should return all vehicles', async () => {
      sinon.stub(vehicleRepository, 'getVehicles').resolves(vehiclesList);

      const vehicles = await vehicleService.getVehicles();

      expect(vehicles).to.be.an('array');
      expect(vehicles).to.be.equals(vehiclesList);
      sinon.restore();
    });
  });

  describe('getVehicleById', () => {
    it('should return a vehicle by ID', async () => {
      sinon.stub(vehicleRepository, 'getVehicles').resolves(vehiclesList[0]);
      const vehicle = await vehicleService.getVehicles(1);

      expect(vehicle).to.be.equal(vehiclesList[0]);
      sinon.restore();
    });

    it('should return null for an invalid ID', async () => {
      sinon.stub(vehicleRepository, 'getVehicles').resolves(null);
      const vehicle = await vehicleService.getVehicles(3);
      expect(vehicle).to.be.equal(null);
      sinon.restore();
    });
  });

  describe('createVehicle', () => {
    it('should create a new vehicle', async () => {
      const newVehicle = {
        id: 3,
        licensePlate: 'GHI9012',
        chassis: 'MNO3456',
        renavam: '123456789',
        brandId: 3,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        brand: {
          id: 3,
          name: 'Toyota',
          model: 'Corolla',
          year: '2020',
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      };
      sinon.stub(vehicleRepository, 'findBrand').resolves(null);
      sinon.stub(vehicleRepository, 'createVehicle').resolves(newVehicle);
      const createdVehicle = await vehicleService.createVehicle(newVehicle);

      expect(createdVehicle).to.have.property('id');
      expect(createdVehicle).to.equal(newVehicle);
      expect(createdVehicle).not.includes(vehiclesList);
      sinon.restore();
    });
  });

  describe('updateVehicle', () => {
    it('should update an existing vehicle', async () => {
      const updatedVehicle = {
        renavam: '987654321',
      };

      sinon.stub(vehicleRepository, 'updateVehicle').resolves({
        ...vehiclesList[0],
        renavam: updatedVehicle.renavam,
      });

      const result = await vehicleService.updateVehicle(1, updatedVehicle);

      expect(result).to.have.property('renavam', updatedVehicle.renavam);
      expect(result).not.equal(vehiclesList[0]);
      sinon.restore();
    });
  });

  describe('deleteVehicle', () => {
    it('should delete a vehicle by ID', async () => {
      const deleteDate = new Date();
      sinon
        .stub(vehicleRepository, 'deleteVehicle')
        .resolves({ ...vehiclesList[1], deletedAt: deleteDate });
      const result = await vehicleService.deleteVehicle(2);
      expect(result).to.have.property('deletedAt', deleteDate);
      expect(result).not.equal(vehiclesList[1]);
      sinon.restore();
    });
  });
});
