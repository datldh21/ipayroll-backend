import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from '../database/entities/employee.entity';
import { EmployeeContract } from '../database/entities/employee-contract.entity';
import { Dependent } from '../database/entities/dependent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, EmployeeContract, Dependent]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
