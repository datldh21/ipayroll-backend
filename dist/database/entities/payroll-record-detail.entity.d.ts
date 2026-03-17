import { PayrollRecord } from './payroll-record.entity';
export declare class PayrollRecordDetail {
    id: string;
    recordId: string;
    record: PayrollRecord;
    stepGroup: number;
    stepName: string;
    formula: string | null;
    inputValues: Record<string, unknown> | null;
    resultValue: number;
}
