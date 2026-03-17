import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { SocialInsuranceService } from './social-insurance.service';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class FindSiQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2020)
  @Max(2100)
  year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;
}

@Controller('social-insurance')
export class SocialInsuranceController {
  constructor(private readonly socialInsuranceService: SocialInsuranceService) {}

  @Get()
  findByPeriod(@Query() query: FindSiQueryDto) {
    const year = query.year ?? new Date().getFullYear();
    const month = query.month ?? new Date().getMonth() + 1;
    return this.socialInsuranceService.findByPeriod(year, month);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.socialInsuranceService.update(id, dto);
  }
}
