import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GenericExceptionFilter } from './common/filters/generic-exception.filter';
import { ValidationException } from './common/exception/validation.exception';

@Module({
  imports: [PrismaModule, VehicleModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors) => new ValidationException(errors),
          disableErrorMessages: false,
          transform: true,
          forbidUnknownValues: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
    { provide: APP_FILTER, useClass: GenericExceptionFilter },
  ],
})
export class AppModule {}
