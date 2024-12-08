import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: async () => {
        const prisma = new PrismaService().$extends({
          query: {
            $allModels: {
              $allOperations({ operation, args, query }) {
                // Updated at
                if (operation === 'update' || operation === 'updateMany') {
                  args['updatedAt'] = new Date();
                }

                // Soft delete
                if (
                  operation === 'findMany' ||
                  operation === 'findFirst' ||
                  operation === 'count' ||
                  operation === 'aggregate'
                ) {
                  if (args === undefined) {
                    args = {};
                  }

                  if (args['where'] !== undefined) {
                    if (args['where'].deletedAt === undefined) {
                      args['where']['deletedAt'] = null;
                    }
                  } else {
                    args['where'] = { deletedAt: null };
                  }
                }

                if (operation === 'delete') {
                  operation = 'update';
                  args['data'] = { deletedAt: new Date() };
                }

                if (operation === 'deleteMany') {
                  // Delete many queries
                  operation = 'updateMany';
                  if (args['data'] !== undefined) {
                    args['data']['deletedAt'] = new Date();
                  } else {
                    args['data'] = { deletedAt: new Date() };
                  }
                }
                return query(args);
              },
            },
          },
        });
        await prisma.$connect();
        return prisma;
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
