import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { PayrollBatch } from './payroll-batch.entity';
import { Employee } from './employee.entity';

@Entity('payroll_records')
@Unique(['batchId', 'employeeId'])
@Index('idx_payroll_records_batch', ['batchId'])
@Index('idx_payroll_records_employee', ['employeeId'])
export class PayrollRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'batch_id', type: 'uuid' })
  batchId: string;

  @ManyToOne(() => PayrollBatch, (batch) => batch.records)
  @JoinColumn({ name: 'batch_id' })
  batch: PayrollBatch;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // Snapshot: contract package
  @Column({ name: 'pkg_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pkgBaseSalary: number;

  @Column({ name: 'pkg_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pkgLunch: number;

  @Column({ name: 'pkg_phone', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pkgPhone: number;

  @Column({ name: 'pkg_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pkgPerfBonus: number;

  @Column({ name: 'pkg_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pkgTotal: number;

  @Column({ name: 'prob_pkg_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 })
  probPkgBaseSalary: number;

  @Column({ name: 'prob_pkg_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 })
  probPkgLunch: number;

  @Column({ name: 'prob_pkg_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 })
  probPkgPerfBonus: number;

  @Column({ name: 'prob_pkg_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  probPkgTotal: number;

  // Group 1: Prorated
  @Column({ name: 'standard_days', type: 'int', default: 0 })
  standardDays: number;

  @Column({ name: 'actual_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  actualDays: number;

  @Column({ name: 'probation_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  probationDays: number;

  @Column({ name: 'official_days', type: 'decimal', precision: 5, scale: 2, default: 0 })
  officialDays: number;

  @Column({ name: 'unpaid_leave_probation', type: 'decimal', precision: 5, scale: 2, default: 0 })
  unpaidLeaveProbation: number;

  @Column({ name: 'unpaid_leave_official', type: 'decimal', precision: 5, scale: 2, default: 0 })
  unpaidLeaveOfficial: number;

  @Column({ name: 'remaining_leave', type: 'decimal', precision: 5, scale: 2, default: 0 })
  remainingLeave: number;

  @Column({ name: 'prorated_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 })
  proratedBaseSalary: number;

  @Column({ name: 'prorated_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 })
  proratedPerfBonus: number;

  @Column({ name: 'total_lunch_actual', type: 'decimal', precision: 15, scale: 0, default: 0 })
  totalLunchActual: number;

  @Column({ name: 'total_phone_actual', type: 'decimal', precision: 15, scale: 0, default: 0 })
  totalPhoneActual: number;

  @Column({ name: 'prorated_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  proratedTotal: number;

  // Group 2: Variable & Gross
  @Column({ name: 'commission', type: 'decimal', precision: 15, scale: 0, default: 0 })
  commission: number;

  @Column({ name: 'bonus', type: 'decimal', precision: 15, scale: 0, default: 0 })
  bonus: number;

  @Column({ name: 'other_income', type: 'decimal', precision: 15, scale: 0, default: 0 })
  otherIncome: number;

  @Column({ name: 'other_allowance', type: 'decimal', precision: 15, scale: 0, default: 0 })
  otherAllowance: number;

  @Column({ name: 'total_variable_income', type: 'decimal', precision: 15, scale: 0, default: 0 })
  totalVariableIncome: number;

  @Column({ name: 'gross_salary', type: 'decimal', precision: 15, scale: 0, default: 0 })
  grossSalary: number;

  // Group 3: Taxable
  @Column({ name: 'non_taxable_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 })
  nonTaxableLunch: number;

  @Column({ name: 'non_taxable_phone', type: 'decimal', precision: 15, scale: 0, default: 0 })
  nonTaxablePhone: number;

  @Column({ name: 'taxable_income', type: 'decimal', precision: 15, scale: 0, default: 0 })
  taxableIncome: number;

  // Group 4: SI & Deductions
  @Column({ name: 'si_base', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siBase: number;

  @Column({ name: 'si_bhxh', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siBhxh: number;

  @Column({ name: 'si_bhyt', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siBhyt: number;

  @Column({ name: 'si_bhtn', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siBhtn: number;

  @Column({ name: 'si_employee_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployeeTotal: number;

  @Column({ name: 'personal_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 })
  personalDeduction: number;

  @Column({ name: 'dependent_count', type: 'int', default: 0 })
  dependentCount: number;

  @Column({ name: 'dependent_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 })
  dependentDeduction: number;

  // Group 5: PIT
  @Column({ name: 'tax_method', type: 'varchar', length: 20 })
  taxMethod: 'progressive' | 'flat_10';

  @Column({ name: 'tax_assessable_income', type: 'decimal', precision: 15, scale: 0, default: 0 })
  taxAssessableIncome: number;

  @Column({ name: 'pit', type: 'decimal', precision: 15, scale: 0, default: 0 })
  pit: number;

  // Group 6: Net
  @Column({ name: 'union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  unionFee: number;

  @Column({ name: 'retro_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 })
  retroDeduction: number;

  @Column({ name: 'retro_addition', type: 'decimal', precision: 15, scale: 0, default: 0 })
  retroAddition: number;

  @Column({ name: 'total_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 })
  totalDeduction: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 15, scale: 0, default: 0 })
  netSalary: number;

  // Group 7: Employer cost
  @Column({ name: 'si_employer_bhxh', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployerBhxh: number;

  @Column({ name: 'si_employer_bhyt', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployerBhyt: number;

  @Column({ name: 'si_employer_bhtn', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployerBhtn: number;

  @Column({ name: 'si_employer_total', type: 'decimal', precision: 15, scale: 0, default: 0 })
  siEmployerTotal: number;

  @Column({ name: 'employer_union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 })
  employerUnionFee: number;

  @Column({ name: 'total_employer_cost', type: 'decimal', precision: 15, scale: 0, default: 0 })
  totalEmployerCost: number;

  // Meta
  @Column({ name: 'cost_account', type: 'varchar', length: 20, nullable: true })
  costAccount: string | null;

  @Column({ name: 'bank_account', type: 'varchar', length: 50, nullable: true })
  bankAccount: string | null;

  @Column({ name: 'bank_name', type: 'varchar', length: 100, nullable: true })
  bankName: string | null;

  @Column({ name: 'is_manually_adjusted', type: 'boolean', default: false })
  isManuallyAdjusted: boolean;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string | null;
}
