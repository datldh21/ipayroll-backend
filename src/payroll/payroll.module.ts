import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';
import { PayrollBatch } from '../database/entities/payroll-batch.entity';
import { PayrollRecord } from '../database/entities/payroll-record.entity';
import { Employee } from '../database/entities/employee.entity';
import { EmployeeContract } from '../database/entities/employee-contract.entity';
import { Dependent } from '../database/entities/dependent.entity';
import { Timekeeping } from '../database/entities/timekeeping.entity';
import { SiMonthlyRecord } from '../database/entities/si-monthly-record.entity';
import { VariableIncome } from '../database/entities/variable-income.entity';
import { User } from '../database/entities/user.entity';
import { TaxBracketVersion } from '../database/entities/tax-bracket-version.entity';
import { SiRateVersion } from '../database/entities/si-rate-version.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayrollBatch,
      PayrollRecord,
      Employee,
      EmployeeContract,
      Dependent,
      Timekeeping,
      SiMonthlyRecord,
      VariableIncome,
      User,
      TaxBracketVersion,
      SiRateVersion,
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
