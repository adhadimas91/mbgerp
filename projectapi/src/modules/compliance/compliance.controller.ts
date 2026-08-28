import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ComplianceService } from './compliance.service';

@ApiTags('Audit & Kepatuhan ISO')
@Controller('compliance')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('audit-logs')
  @ApiOperation({ summary: 'Stream audit trail log forensik BPK (Immutable SHA-256)' })
  async getAuditLogs(
    @Query('entityName') entityName?: string,
    @Query('action') action?: string,
    @Query('limit') limit?: number,
  ) {
    return this.complianceService.getAuditLogs({ entityName, action, limit });
  }

  @Get('incidents')
  @ApiOperation({ summary: 'Daftar laporan ketidaksesuaian mutu & tindakan perbaikan CAPA' })
  async getIncidents() {
    return this.complianceService.getQualityIncidents();
  }

  @Get(['iso-overview', 'iso-standards'])
  @ApiOperation({ summary: 'Matriks kepatuhan standar ISO 22000, 9001, 27001 & Halal' })
  async getIsoOverview() {
    return this.complianceService.getIsoComplianceOverview();
  }
}
