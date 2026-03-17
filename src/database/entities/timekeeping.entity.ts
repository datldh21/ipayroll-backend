import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('timekeeping')
@Unique(['employeeId', 'year', 'month'])
@Index('idx_timekeeping_period', ['year', 'month', 'employeeId'])
export class Timekeeping {
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

  @Column({ name: 'standard_days', type: 'int' })
  standardDays: number;

  @Column({ name: 'actual_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  actualDays: number;

  @Column({ name: 'probation_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  probationDays: number;

  @Column({ name: 'official_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  officialDays: number;

  @Column({ name: 'remaining_leave', type: 'decimal', precision: 5, scale: 2, default: 0 })
  remainingLeave: number;

  @Column({ name: 'unpaid_leave', type: 'decimal', precision: 5, scale: 2, default: 0 })
  unpaidLeave: number;

  @Column({ name: 'unpaid_leave_probation', type: 'decimal', precision: 5, scale: 2, default: 0 })
  unpaidLeaveProbation: number;

  @Column({ name: 'unpaid_leave_official', type: 'decimal', precision: 5, scale: 2, default: 0 })
  unpaidLeaveOfficial: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
