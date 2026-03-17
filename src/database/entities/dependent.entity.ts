import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('dependents')
export class Dependent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'full_name', type: 'varchar', length: 200 })
  fullName: string;

  @Column({ name: 'relationship', type: 'varchar', length: 50, nullable: true })
  relationship: string | null;

  @Column({ name: 'tax_id', type: 'varchar', length: 20, nullable: true })
  taxId: string | null;

  @Column({ name: 'registered_from', type: 'date' })
  registeredFrom: Date;

  @Column({ name: 'registered_to', type: 'date', nullable: true })
  registeredTo: Date | null;
}
