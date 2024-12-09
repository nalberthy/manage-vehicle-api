import { GenericException } from '../../common/exception/generic.exception';

export abstract class VehicleErrors {
  static readonly VEHICLE_ALREADY_EXISTS = (context?: any) => {
    return new GenericException(
      422,
      'VEHICLE_ALREADY_EXISTS',
      'vehicle already exists',
      context,
    );
  };
  static readonly BRAND_ALREADY_EXISTS = (context?: any) => {
    return new GenericException(
      422,
      'BRAND_ALREADY_EXISTS',
      'brand already exists',
      context,
    );
  };
}
