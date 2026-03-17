import { PayrollRecord } from './payroll-record.entity';
import { User } from './user.entity';
export declare class PayrollRecordAdjustment {
    id: string;
    recordId: string;
    record: PayrollRecord;
    fieldName: string;
    oldValue: string | null;
    newValue: string | null;
    changedBy: string;
    changedByUser: User;
    changedAt: Date;
    reason: string | null;
}
