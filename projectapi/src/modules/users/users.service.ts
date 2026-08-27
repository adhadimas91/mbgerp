import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: { role?: UserRole; status?: UserStatus; search?: string }) {
    const where: any = {};
    if (params?.role) where.role = params.role;
    if (params?.status) where.status = params.status;
    if (params?.search) {
      where.OR = [
        { fullName: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { username: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        phone: true,
        role: true,
        status: true,
        twoFactorEnabled: true,
        assignedRegion: true,
        kitchenUnit: { select: { id: true, name: true, code: true } },
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        phone: true,
        role: true,
        status: true,
        twoFactorEnabled: true,
        assignedRegion: true,
        kitchenUnit: true,
        employee: true,
        supplier: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Pengguna dengan ID ${id} tidak ditemukan`);
    }

    return user;
  }
}
