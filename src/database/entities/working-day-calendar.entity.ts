import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('working_day_calendar')
@Unique(['year', 'month'])
export class WorkingDayCalendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'month', type: 'int' })
  month: number;

  @Column({ name: 'standard_days', type: 'int' })
  standardDays: number;

  @Column({ name: 'note', type: 'varchar', length: 200, nullable: true })
  note: string | null;
}
