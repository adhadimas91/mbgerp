import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('System Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Periksa status kesehatan server dan koneksi database' })
  @ApiResponse({ status: 200, description: 'Layanan API beroperasi normal' })
  async check() {
    let dbStatus = 'DISCONNECTED';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'HEALTHY';
    } catch {
      dbStatus = 'UNAVAILABLE';
    }

    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'MBG ERP Enterprise Backend API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: process.uptime(),
      components: {
        database: {
          type: 'PostgreSQL',
          status: dbStatus,
        },
        memory: {
          heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          rssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
        },
      },
    };
  }
}
