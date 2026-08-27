import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    this.logger.log('🔌 Connecting to PostgreSQL database via Prisma ORM...');
    try {
      await this.$connect();
      this.logger.log('✅ Connected to PostgreSQL database successfully.');
    } catch (error) {
      this.logger.warn(`⚠️ Database connection deferred / warning: ${(error as any)?.message}`);
    }
  }

  async onModuleDestroy() {
    this.logger.log('🔌 Disconnecting from PostgreSQL database...');
    await this.$disconnect();
  }
}
