import { Employee } from './employee.entity';
import { User } from './user.entity';
export declare class VariableIncome {
    id: string;
    employeeId: string;
    employee: Employee;
    year: number;
    month: number;
    commission: number;
    commissionDetail: string | null;
    bonus: number;
    bonusDetail: string | null;
    otherIncome: number;
    otherIncomeDetail: string | null;
    otherAllowance: number;
    otherAllowanceDetail: string | null;
    updatedBy: string | null;
    updatedByUser: User | null;
    updatedAt: Date;
}
