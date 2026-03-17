import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class FindTimekeepingQueryDto {
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

@Controller('timekeeping')
export class TimekeepingController {
  constructor(private readonly timekeepingService: TimekeepingService) {}

  @Get()
  findByPeriod(@Query() query: FindTimekeepingQueryDto) {
    const year = query.year ?? new Date().getFullYear();
    const month = query.month ?? new Date().getMonth() + 1;
    return this.timekeepingService.findByPeriod(year, month);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.timekeepingService.update(id, dto);
  }
}
