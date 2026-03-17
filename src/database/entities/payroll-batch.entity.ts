import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { TaxBracketVersion } from './tax-bracket-version.entity';
import { SiRateVersion } from './si-rate-version.entity';
import { PayrollRecord } from './payroll-record.entity';

export type PayrollBatchStatus = 'draft' | 'pending_approval' | 'approved' | 'paid';

@Entity('payroll_batches')
@Unique(['year', 'month'])
@Index('idx_payroll_batches_period', ['year', 'month'])
@Index('idx_payroll_batches_status', ['status'])
export class PayrollBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'month', type: 'int' })
  month: number;

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'draft' })
  status: PayrollBatchStatus;

  @Column({ name: 'tax_bracket_version_id', type: 'uuid', nullable: true })
  taxBracketVersionId: string | null;

  @ManyToOne(() => TaxBracketVersion, { nullable: true })
  @JoinColumn({ name: 'tax_bracket_version_id' })
  taxBracketVersion: TaxBracketVersion | null;

  @Column({ name: 'si_rate_version_id', type: 'uuid', nullable: true })
  siRateVersionId: string | null;

  @ManyToOne(() => SiRateVersion, { nullable: true })
  @JoinColumn({ name: 'si_rate_version_id' })
  siRateVersion: SiRateVersion | null;

  @Column({ name: 'total_employees', type: 'int', default: 0 })
  totalEmployees: number;

  @Column({ name: 'total_gross', type: 'decimal', precision: 18, scale: 0, default: 0 })
  totalGross: number;

  @Column({ name: 'total_net', type: 'decimal', precision: 18, scale: 0, default: 0 })
  totalNet: number;

  @Column({ name: 'total_pit', type: 'decimal', precision: 18, scale: 0, default: 0 })
  totalPit: number;

  @Column({ name: 'total_si_employee', type: 'decimal', precision: 18, scale: 0, default: 0 })
  totalSiEmployee: number;

  @Column({ name: 'total_employer_cost', type: 'decimal', precision: 18, scale: 0, default: 0 })
  totalEmployerCost: number;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  approvedBy: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approvedByUser: User | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt: Date | null;

  @OneToMany(() => PayrollRecord, (record) => record.batch)
  records: PayrollRecord[];
}
