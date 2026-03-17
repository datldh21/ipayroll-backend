import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Employee } from '../database/entities/employee.entity';
import { EmployeeContract } from '../database/entities/employee-contract.entity';
import { Dependent } from '../database/entities/dependent.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(EmployeeContract)
    private readonly contractRepo: Repository<EmployeeContract>,
    @InjectRepository(Dependent)
    private readonly dependentRepo: Repository<Dependent>,
  ) {}

  async findAll() {
    const employees = await this.employeeRepo.find({
      where: { deletedAt: IsNull() },
      order: { employeeCode: 'ASC' },
    });

    const result = await Promise.all(
      employees.map(async (emp) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const depCount = await this.dependentRepo
          .createQueryBuilder('d')
          .where('d.employee_id = :empId', { empId: emp.id })
          .andWhere('d.registered_from <= :endOfMonth', { endOfMonth })
          .andWhere(
            '(d.registered_to IS NULL OR d.registered_to >= :startOfMonth)',
            {
              startOfMonth,
            },
          )
          .getCount();

        const contract = await this.contractRepo.findOne({
          where: { employeeId: emp.id },
          order: { effectiveDate: 'DESC' },
        });

        return this.toResponse(
          emp,
          Number(contract?.baseSalary ?? 0),
          depCount,
        );
      }),
    );

    return result;
  }

  private toDateString(val: Date | string | null | undefined): string {
    if (val == null) return '';
    if (val instanceof Date) return val.toISOString().split('T')[0];
    if (typeof val === 'string') return val.split('T')[0];
    return '';
  }

  private toResponse(emp: Employee, baseSalary: number, dependents: number) {
    return {
      id: emp.id,
      employeeCode: emp.employeeCode,
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone,
      bankAccount: emp.bankAccount,
      bankName: emp.bankName,
      department: emp.department,
      position: emp.position,
      level: emp.level,
      orgLevel1: emp.orgLevel1,
      orgLevel2: emp.orgLevel2,
      orgLevel3: emp.orgLevel3,
      orgLevel4: emp.orgLevel4,
      orgLevel5: emp.orgLevel5,
      status: emp.status,
      onboardDate: this.toDateString(emp.onboardDate),
      officialDate: this.toDateString(emp.officialDate),
      lastWorkingDate: this.toDateString(emp.lastWorkingDate),
      dependents,
      baseSalary: Number(baseSalary),
      costAccount: emp.costAccount,
    };
  }
}
