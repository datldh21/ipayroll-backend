import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { SiRateVersion } from './si-rate-version.entity';

@Entity('si_rates')
@Unique(['versionId', 'siType', 'party'])
@Index('idx_si_rates_version', ['versionId', 'siType', 'party'])
export class SiRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'version_id', type: 'uuid' })
  versionId: string;

  @ManyToOne(() => SiRateVersion)
  @JoinColumn({ name: 'version_id' })
  version: SiRateVersion;

  @Column({ name: 'si_type', type: 'varchar', length: 20 })
  siType: 'bhxh' | 'bhyt' | 'bhtn' | 'union_fee';

  @Column({ name: 'party', type: 'varchar', length: 20 })
  party: 'employee' | 'employer';

  @Column({ name: 'rate', type: 'decimal', precision: 5, scale: 4 })
  rate: number;
}
