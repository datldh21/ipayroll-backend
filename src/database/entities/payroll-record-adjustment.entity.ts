import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PayrollRecord } from './payroll-record.entity';
import { User } from './user.entity';

@Entity('payroll_record_adjustments')
export class PayrollRecordAdjustment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'record_id', type: 'uuid' })
  recordId: string;

  @ManyToOne(() => PayrollRecord)
  @JoinColumn({ name: 'record_id' })
  record: PayrollRecord;

  @Column({ name: 'field_name', type: 'varchar', length: 100 })
  fieldName: string;

  @Column({ name: 'old_value', type: 'text', nullable: true })
  oldValue: string | null;

  @Column({ name: 'new_value', type: 'text', nullable: true })
  newValue: string | null;

  @Column({ name: 'changed_by', type: 'uuid' })
  changedBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'changed_by' })
  changedByUser: User;

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason: string | null;
}
