import { Repository } from 'typeorm';
import { Employee } from '../database/entities/employee.entity';
import { EmployeeContract } from '../database/entities/employee-contract.entity';
import { Dependent } from '../database/entities/dependent.entity';
export declare class EmployeesService {
    private readonly employeeRepo;
    private readonly contractRepo;
    private readonly dependentRepo;
    constructor(employeeRepo: Repository<Employee>, contractRepo: Repository<EmployeeContract>, dependentRepo: Repository<Dependent>);
    findAll(): Promise<{
        id: string;
        employeeCode: string;
        fullName: string;
        email: string;
        phone: string | null;
        bankAccount: string | null;
        bankName: string | null;
        department: string | null;
        position: string | null;
        level: string | null;
        orgLevel1: string | null;
        orgLevel2: string | null;
        orgLevel3: string | null;
        orgLevel4: string | null;
        orgLevel5: string | null;
        status: import("../database/entities/employee.entity").EmployeeStatus;
        onboardDate: string;
        officialDate: string;
        lastWorkingDate: string;
        dependents: number;
        baseSalary: number;
        costAccount: string | null;
    }[]>;
    private toDateString;
    private toResponse;
}
