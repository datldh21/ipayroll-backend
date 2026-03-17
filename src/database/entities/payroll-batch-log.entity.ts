import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PayrollBatch } from './payroll-batch.entity';
import { User } from './user.entity';

@Entity('payroll_batch_logs')
@Index('idx_batch_logs_batch', ['batchId', 'changedAt'])
export class PayrollBatchLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'batch_id', type: 'uuid' })
  batchId: string;

  @ManyToOne(() => PayrollBatch)
  @JoinColumn({ name: 'batch_id' })
  batch: PayrollBatch;

  @Column({ name: 'action', type: 'varchar', length: 30 })
  action: string;

  @Column({ name: 'from_status', type: 'varchar', length: 20, nullable: true })
  fromStatus: string | null;

  @Column({ name: 'to_status', type: 'varchar', length: 20, nullable: true })
  toStatus: string | null;

  @Column({ name: 'changed_by', type: 'uuid' })
  changedBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'changed_by' })
  changedByUser: User;

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;

  @Column({ name: 'note', type: 'text', nullable: true })
  note: string | null;
}
