import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EmployeesService } from './employees.service';

@ApiTags('SDM & Karyawan')
@Controller('employees')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar direktori karyawan dapur SPPG & staf MBG' })
  async getEmployees(
    @Query('department') department?: string,
    @Query('position') position?: string,
    @Query('search') search?: string,
  ) {
    return this.employeesService.getEmployees({ department, position, search });
  }

  @Get('shifts')
  @ApiOperation({ summary: 'Jadwal shift kerja tim dapur sentral & presensi' })
  async getShifts() {
    return this.employeesService.getShifts();
  }

  @Get('payroll')
  @ApiOperation({ summary: 'Riwayat penggajian payroll bulanan' })
  async getPayroll() {
    return this.employeesService.getPayrollRuns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail rekam medis MCU, sertifikasi hygiene & slip gaji karyawan' })
  async getEmployee(@Param('id') id: string) {
    return this.employeesService.getEmployee(id);
  }
}
