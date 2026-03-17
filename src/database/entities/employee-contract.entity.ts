import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_contracts')
@Index('idx_employee_contracts_lookup', [
  'employeeId',
  'contractType',
  'effectiveDate',
])
export class EmployeeContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'contract_type', type: 'varchar', length: 10 })
  contractType: 'hdtv' | 'hdld';

  @Column({ name: 'base_salary', type: 'decimal', precision: 15, scale: 0 })
  baseSalary: number;

  @Column({
    name: 'lunch_allowance',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 1000000,
  })
  lunchAllowance: number;

  @Column({
    name: 'phone_allowance',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 500000,
  })
  phoneAllowance: number;

  @Column({ name: 'effective_date', type: 'date' })
  effectiveDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
