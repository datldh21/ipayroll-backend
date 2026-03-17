import { Employee } from './employee.entity';
export declare class EmployeeContract {
    id: string;
    employeeId: string;
    employee: Employee;
    contractType: 'hdtv' | 'hdld';
    baseSalary: number;
    lunchAllowance: number;
    phoneAllowance: number;
    effectiveDate: Date;
    endDate: Date | null;
    createdAt: Date;
}
