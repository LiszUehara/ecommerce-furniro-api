import { INestApplication, Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  enableGracefulShutdown(app: INestApplication) {
    process.on('SIGINT', async () => {
      try {
        await app.close();
      } finally {
        await this.$disconnect();
        process.exit(0);
      }
    });
  }
}
