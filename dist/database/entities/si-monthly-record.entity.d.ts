import { Employee } from './employee.entity';
import { SiRateVersion } from './si-rate-version.entity';
export declare class SiMonthlyRecord {
    id: string;
    employeeId: string;
    employee: Employee;
    year: number;
    month: number;
    siBase: number;
    isExempt: boolean;
    exemptReason: string | null;
    bhxhEmployee: number;
    bhytEmployee: number;
    bhtnEmployee: number;
    siEmployeeTotal: number;
    bhxhEmployer: number;
    bhytEmployer: number;
    bhtnEmployer: number;
    siEmployerTotal: number;
    unionFee: number;
    siRateVersionId: string | null;
    siRateVersion: SiRateVersion | null;
}
