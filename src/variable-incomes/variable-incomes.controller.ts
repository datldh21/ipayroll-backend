import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { VariableIncomesService } from './variable-incomes.service';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class FindVariableIncomesQueryDto {
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

@Controller('variable-incomes')
export class VariableIncomesController {
  constructor(private readonly variableIncomesService: VariableIncomesService) {}

  @Get()
  findByPeriod(@Query() query: FindVariableIncomesQueryDto) {
    const year = query.year ?? new Date().getFullYear();
    const month = query.month ?? new Date().getMonth() + 1;
    return this.variableIncomesService.findByPeriod(year, month);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.variableIncomesService.update(id, dto);
  }
}
