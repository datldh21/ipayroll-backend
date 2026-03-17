import { Employee } from './employee.entity';
export declare class Dependent {
    id: string;
    employeeId: string;
    employee: Employee;
    fullName: string;
    relationship: string | null;
    taxId: string | null;
    registeredFrom: Date;
    registeredTo: Date | null;
}
