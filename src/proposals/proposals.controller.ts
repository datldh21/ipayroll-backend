import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { IsString, IsUUID, IsIn, IsInt, Min, Max } from 'class-validator';

class CreateProposalDto {
  @IsUUID()
  employeeId: string;

  @IsIn(['timekeeping', 'payroll'])
  type: 'timekeeping' | 'payroll';

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(2020)
  @Max(2100)
  year: number;

  @IsString()
  subject: string;

  @IsString()
  description: string;
}

class RespondProposalDto {
  @IsIn(['pending', 'processing', 'resolved', 'rejected'])
  status: 'pending' | 'processing' | 'resolved' | 'rejected';

  @IsString()
  response: string;

  @IsString()
  respondedBy: string;
}

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  findAll() {
    return this.proposalsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProposalDto) {
    return this.proposalsService.create(dto);
  }

  @Patch(':id/respond')
  respond(@Param('id') id: string, @Body() dto: RespondProposalDto) {
    return this.proposalsService.respond(id, dto.status, dto.response, dto.respondedBy);
  }
}
