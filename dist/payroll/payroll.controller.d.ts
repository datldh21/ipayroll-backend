import { PayrollService } from './payroll.service';
declare class GeneratePayrollDto {
    month: number;
    year: number;
    createdBy: string;
}
declare class ApproveBatchDto {
    approvedBy: string;
}
declare class UpdateRecordDto {
    commission?: number;
    commissionDetail?: string;
    bonus?: number;
    bonusDetail?: string;
    otherIncome?: number;
    otherIncomeDetail?: string;
    otherAllowance?: number;
    otherAllowanceDetail?: string;
    retroDeduction?: number;
    retroAddition?: number;
    remainingLeave?: number;
}
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    findAllBatches(): Promise<{
        id: string;
        month: number;
        year: number;
        status: import("../database/entities/payroll-batch.entity").PayrollBatchStatus;
        createdBy: any;
        createdAt: string;
        approvedBy: any;
        approvedAt: string | undefined;
        totalEmployees: number;
        totalGross: number;
        totalNet: number;
        totalTax: number;
        totalSI: number;
        totalEmployerCost: number;
        records: any;
    }[]>;
    generatePayroll(dto: GeneratePayrollDto): Promise<{
        id: string;
        month: number;
        year: number;
        status: import("../database/entities/payroll-batch.entity").PayrollBatchStatus;
        createdBy: any;
        createdAt: string;
        approvedBy: any;
        approvedAt: string | undefined;
        totalEmployees: number;
        totalGross: number;
        totalNet: number;
        totalTax: number;
        totalSI: number;
        totalEmployerCost: number;
        records: any;
    }>;
    approveBatch(id: string, dto: ApproveBatchDto): Promise<{
        id: string;
        month: number;
        year: number;
        status: import("../database/entities/payroll-batch.entity").PayrollBatchStatus;
        createdBy: any;
        createdAt: string;
        approvedBy: any;
        approvedAt: string | undefined;
        totalEmployees: number;
        totalGross: number;
        totalNet: number;
        totalTax: number;
        totalSI: number;
        totalEmployerCost: number;
        records: any;
    }[]>;
    updateRecord(batchId: string, recordId: string, dto: UpdateRecordDto): Promise<{
        id: string;
        month: number;
        year: number;
        status: import("../database/entities/payroll-batch.entity").PayrollBatchStatus;
        createdBy: any;
        createdAt: string;
        approvedBy: any;
        approvedAt: string | undefined;
        totalEmployees: number;
        totalGross: number;
        totalNet: number;
        totalTax: number;
        totalSI: number;
        totalEmployerCost: number;
        records: any;
    }>;
}
export {};
