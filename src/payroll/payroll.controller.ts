import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { IsInt, Min, Max, IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class GeneratePayrollDto {
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month: number;

  @IsInt()
  @Min(2020)
  @Max(2100)
  @Type(() => Number)
  year: number;

  @IsString()
  createdBy: string;
}

class ApproveBatchDto {
  @IsString()
  approvedBy: string;
}

class UpdateRecordDto {
  @IsOptional()
  @IsNumber()
  commission?: number;

  @IsOptional()
  @IsString()
  commissionDetail?: string;

  @IsOptional()
  @IsNumber()
  bonus?: number;

  @IsOptional()
  @IsString()
  bonusDetail?: string;

  @IsOptional()
  @IsNumber()
  otherIncome?: number;

  @IsOptional()
  @IsString()
  otherIncomeDetail?: string;

  @IsOptional()
  @IsNumber()
  otherAllowance?: number;

  @IsOptional()
  @IsString()
  otherAllowanceDetail?: string;

  @IsOptional()
  @IsNumber()
  retroDeduction?: number;

  @IsOptional()
  @IsNumber()
  retroAddition?: number;

  @IsOptional()
  @IsNumber()
  remainingLeave?: number;
}

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get('batches')
  findAllBatches() {
    return this.payrollService.findAllBatches();
  }

  @Post('batches/generate')
  generatePayroll(@Body() dto: GeneratePayrollDto) {
    return this.payrollService.generatePayroll(dto.month, dto.year, dto.createdBy);
  }

  @Patch('batches/:id/approve')
  approveBatch(@Param('id') id: string, @Body() dto: ApproveBatchDto) {
    return this.payrollService.approveBatch(id, dto.approvedBy);
  }

  @Patch('batches/:batchId/records/:recordId')
  updateRecord(
    @Param('batchId') batchId: string,
    @Param('recordId') recordId: string,
    @Body() dto: UpdateRecordDto,
  ) {
    return this.payrollService.updateRecord(batchId, recordId, dto);
  }
}
