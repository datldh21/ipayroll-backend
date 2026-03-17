import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

export type EmployeeStatus =
  | 'chinh_thuc'
  | 'thai_san'
  | 'nghi_viec_ct'
  | 'het_thu_viec'
  | 'thu_viec'
  | 'nghi_viec_tv';

@Entity('employees')
@Index('idx_employees_status', ['status'], { where: 'deleted_at IS NULL' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_code', type: 'varchar', length: 20, unique: true })
  employeeCode: string;

  @Column({ name: 'full_name', type: 'varchar', length: 200 })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ name: 'bank_account', type: 'varchar', length: 50, nullable: true })
  bankAccount: string | null;

  @Column({ name: 'bank_name', type: 'varchar', length: 100, nullable: true })
  bankName: string | null;

  @Column({ name: 'department', type: 'varchar', length: 100, nullable: true })
  department: string | null;

  @Column({ name: 'position', type: 'varchar', length: 100, nullable: true })
  position: string | null;

  @Column({
    name: 'level',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  level: string | null;

  @Column({ name: 'org_level_1', type: 'varchar', length: 100, nullable: true })
  orgLevel1: string | null;

  @Column({ name: 'org_level_2', type: 'varchar', length: 100, nullable: true })
  orgLevel2: string | null;

  @Column({ name: 'org_level_3', type: 'varchar', length: 100, nullable: true })
  orgLevel3: string | null;

  @Column({ name: 'org_level_4', type: 'varchar', length: 100, nullable: true })
  orgLevel4: string | null;

  @Column({ name: 'org_level_5', type: 'varchar', length: 100, nullable: true })
  orgLevel5: string | null;

  @Column({ name: 'status', type: 'varchar', length: 30 })
  status: EmployeeStatus;

  @Column({ name: 'onboard_date', type: 'date', nullable: true })
  onboardDate: Date | null;

  @Column({ name: 'official_date', type: 'date', nullable: true })
  officialDate: Date | null;

  @Column({ name: 'last_working_date', type: 'date', nullable: true })
  lastWorkingDate: Date | null;

  @Column({ name: 'cost_account', type: 'varchar', length: 20, nullable: true })
  costAccount: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
