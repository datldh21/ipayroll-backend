import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableIncomesController } from './variable-incomes.controller';
import { VariableIncomesService } from './variable-incomes.service';
import { VariableIncome } from '../database/entities/variable-income.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariableIncome])],
  controllers: [VariableIncomesController],
  providers: [VariableIncomesService],
  exports: [VariableIncomesService],
})
export class VariableIncomesModule {}
