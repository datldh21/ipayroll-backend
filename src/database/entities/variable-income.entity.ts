import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Employee } from './employee.entity';
import { User } from './user.entity';

@Entity('variable_incomes')
@Unique(['employeeId', 'year', 'month'])
@Index('idx_variable_incomes_period', ['year', 'month', 'employeeId'])
export class VariableIncome {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'month', type: 'int' })
  month: number;

  @Column({ name: 'commission', type: 'decimal', precision: 15, scale: 0, default: 0 })
  commission: number;

  @Column({ name: 'commission_detail', type: 'text', nullable: true })
  commissionDetail: string | null;

  @Column({ name: 'bonus', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bonus: number;

  @Column({ name: 'bonus_detail', type: 'text', nullable: true })
  bonusDetail: string | null;

  @Column({ name: 'other_income', type: 'decimal', precision: 15, scale: 0, default: 0 })
  otherIncome: number;

  @Column({ name: 'other_income_detail', type: 'text', nullable: true })
  otherIncomeDetail: string | null;

  @Column({ name: 'other_allowance', type: 'decimal', precision: 15, scale: 0, default: 0 })
  otherAllowance: number;

  @Column({ name: 'other_allowance_detail', type: 'text', nullable: true })
  otherAllowanceDetail: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
