import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PayrollRecord } from './payroll-record.entity';

@Entity('payroll_record_details')
@Index('idx_payroll_record_details_record', ['recordId'])
export class PayrollRecordDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'record_id', type: 'uuid' })
  recordId: string;

  @ManyToOne(() => PayrollRecord, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'record_id' })
  record: PayrollRecord;

  @Column({ name: 'step_group', type: 'int' })
  stepGroup: number;

  @Column({ name: 'step_name', type: 'varchar', length: 100 })
  stepName: string;

  @Column({ name: 'formula', type: 'text', nullable: true })
  formula: string | null;

  @Column({ name: 'input_values', type: 'jsonb', nullable: true })
  inputValues: Record<string, unknown> | null;

  @Column({ name: 'result_value', type: 'decimal', precision: 18, scale: 4 })
  resultValue: number;
}
