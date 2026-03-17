import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';
import { Proposal } from '../database/entities/proposal.entity';
import { Employee } from '../database/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal, Employee]),
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
  exports: [ProposalsService],
})
export class ProposalsModule {}
