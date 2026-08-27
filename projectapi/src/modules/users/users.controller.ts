import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserRole, UserStatus } from '@prisma/client';

@ApiTags('Users & RBAC')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar seluruh pengguna sistem dengan filter peran & status' })
  async findAll(
    @Query('role') role?: UserRole,
    @Query('status') status?: UserStatus,
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll({ role, status, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail profil & wewenang pengguna berdasarkan ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
