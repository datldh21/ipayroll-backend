import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

@Entity('payroll_configs')
@Index('idx_payroll_configs_key_date', ['configKey', 'effectiveFrom'])
export class PayrollConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'config_key', type: 'varchar', length: 100 })
  configKey: string;

  @Column({ name: 'config_value', type: 'decimal', precision: 20, scale: 4 })
  configValue: number;

  @Column({ name: 'effective_from', type: 'date' })
  effectiveFrom: Date;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo: Date | null;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
