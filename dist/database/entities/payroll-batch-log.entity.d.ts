import { PayrollBatch } from './payroll-batch.entity';
import { User } from './user.entity';
export declare class PayrollBatchLog {
    id: string;
    batchId: string;
    batch: PayrollBatch;
    action: string;
    fromStatus: string | null;
    toStatus: string | null;
    changedBy: string;
    changedByUser: User;
    changedAt: Date;
    note: string | null;
}
