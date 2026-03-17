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
import { User } from './user.entity';

@Entity('proposals')
@Index('idx_proposals_employee', ['employeeId', 'year', 'month'])
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'type', type: 'varchar', length: 20 })
  type: 'timekeeping' | 'payroll';

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'month', type: 'int' })
  month: number;

  @Column({ name: 'subject', type: 'varchar', length: 300 })
  subject: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'pending' })
  status: 'pending' | 'processing' | 'resolved' | 'rejected';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'response', type: 'text', nullable: true })
  response: string | null;

  @Column({ name: 'responded_by', type: 'uuid', nullable: true })
  respondedBy: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'responded_by' })
  respondedByUser: User | null;

  @Column({ name: 'responded_at', type: 'timestamptz', nullable: true })
  respondedAt: Date | null;
}
