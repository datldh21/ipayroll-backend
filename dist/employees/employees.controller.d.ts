import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
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
}
