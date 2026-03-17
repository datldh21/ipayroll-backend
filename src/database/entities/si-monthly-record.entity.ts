import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Employee } from './employee.entity';
import { SiRateVersion } from './si-rate-version.entity';

@Entity('si_monthly_records')
@Unique(['employeeId', 'year', 'month'])
@Index('idx_si_monthly_period', ['year', 'month', 'employeeId'])
export class SiMonthlyRecord {
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

  @Column({ name: 'si_base', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siBase: number;

  @Column({ name: 'is_exempt', type: 'boolean', default: false })
  isExempt: boolean;

  @Column({ name: 'exempt_reason', type: 'varchar', length: 200, nullable: true })
  exemptReason: string | null;

  @Column({ name: 'bhxh_employee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhxhEmployee: number;

  @Column({ name: 'bhyt_employee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhytEmployee: number;

  @Column({ name: 'bhtn_employee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhtnEmployee: number;

  @Column({ name: 'si_employee_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployeeTotal: number;

  @Column({ name: 'bhxh_employer', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhxhEmployer: number;

  @Column({ name: 'bhyt_employer', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhytEmployer: number;

  @Column({ name: 'bhtn_employer', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bhtnEmployer: number;

  @Column({ name: 'si_employer_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployerTotal: number;

  @Column({ name: 'union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  unionFee: number;

  @Column({ name: 'si_rate_version_id', type: 'uuid', nullable: true })
  siRateVersionId: string | null;

  @ManyToOne(() => SiRateVersion, { nullable: true })
  @JoinColumn({ name: 'si_rate_version_id' })
  siRateVersion: SiRateVersion | null;
}
