import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(params?: { department?: string; position?: string; search?: string }) {
    const where: any = {};
    if (params?.department) where.department = params.department;
    if (params?.position) where.position = params.position;
    if (params?.search) {
      where.OR = [
        { fullName: { contains: params.search, mode: 'insensitive' } },
        { nik: { contains: params.search, mode: 'insensitive' } },
        { nip: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.employee.findMany({
      where,
      include: {
        kitchenUnit: { select: { id: true, name: true, code: true } },
        mcuRecords: { take: 1, orderBy: { examinationDate: 'desc' } },
      },
      orderBy: { fullName: 'asc' },
    });
  }

  async getEmployee(id: string) {
    const emp = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        kitchenUnit: true,
        mcuRecords: { orderBy: { examinationDate: 'desc' } },
        attendances: { take: 10, orderBy: { attendanceDate: 'desc' } },
        payrollItems: { take: 6, orderBy: { id: 'desc' } },
      },
    });

    if (!emp) {
      throw new NotFoundException(`Karyawan dengan ID ${id} tidak ditemukan`);
    }

    return emp;
  }

  async getShifts() {
    return this.prisma.shiftSchedule.findMany({
      include: {
        assignments: {
          include: {
            employee: { select: { id: true, fullName: true, position: true } },
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async getPayrollRuns() {
    return this.prisma.payrollRun.findMany({
      include: {
        items: {
          include: {
            employee: { select: { fullName: true, position: true, nip: true } },
          },
        },
      },
      orderBy: { periodYear: 'desc' },
    });
  }
}
