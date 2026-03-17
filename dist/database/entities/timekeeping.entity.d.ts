import { Employee } from './employee.entity';
export declare class Timekeeping {
    id: string;
    employeeId: string;
    employee: Employee;
    year: number;
    month: number;
    standardDays: number;
    actualDays: number;
    probationDays: number;
    officialDays: number;
    remainingLeave: number;
    unpaidLeave: number;
    unpaidLeaveProbation: number;
    unpaidLeaveOfficial: number;
    createdAt: Date;
    updatedAt: Date;
}
