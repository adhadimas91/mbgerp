import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MenuModule } from './modules/menu/menu.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { LogisticsModule } from './modules/logistics/logistics.module';
import { AssetsModule } from './modules/assets/assets.module';
import { FinanceModule } from './modules/finance/finance.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    SuppliersModule,
    InventoryModule,
    MenuModule,
    KitchenModule,
    LogisticsModule,
    AssetsModule,
    FinanceModule,
    ComplianceModule,
    EmployeesModule,
  ],
})
export class AppModule {}
