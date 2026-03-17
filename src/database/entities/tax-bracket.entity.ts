import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { TaxBracketVersion } from './tax-bracket-version.entity';

@Entity('tax_brackets')
@Unique(['versionId', 'bracketOrder'])
@Index('idx_tax_brackets_version', ['versionId', 'bracketOrder'])
export class TaxBracket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'version_id', type: 'uuid' })
  versionId: string;

  @ManyToOne(() => TaxBracketVersion)
  @JoinColumn({ name: 'version_id' })
  version: TaxBracketVersion;

  @Column({ name: 'bracket_order', type: 'int' })
  bracketOrder: number;

  @Column({ name: 'income_from', type: 'decimal', precision: 15, scale: 0 })
  incomeFrom: number;

  @Column({ name: 'income_to', type: 'decimal', precision: 15, scale: 0, nullable: true })
  incomeTo: number | null;

  @Column({ name: 'rate', type: 'decimal', precision: 5, scale: 4 })
  rate: number;
}
