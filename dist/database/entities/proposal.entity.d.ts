import { Employee } from './employee.entity';
import { User } from './user.entity';
export declare class Proposal {
    id: string;
    employeeId: string;
    employee: Employee;
    type: 'timekeeping' | 'payroll';
    year: number;
    month: number;
    subject: string;
    description: string | null;
    status: 'pending' | 'processing' | 'resolved' | 'rejected';
    createdAt: Date;
    response: string | null;
    respondedBy: string | null;
    respondedByUser: User | null;
    respondedAt: Date | null;
}
