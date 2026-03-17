import { Repository } from 'typeorm';
import { Proposal } from '../database/entities/proposal.entity';
import { Employee } from '../database/entities/employee.entity';
export declare class ProposalsService {
    private readonly repo;
    private readonly employeeRepo;
    constructor(repo: Repository<Proposal>, employeeRepo: Repository<Employee>);
    findAll(): Promise<{
        id: string;
        employeeId: string;
        employeeName: string;
        department: string;
        type: "timekeeping" | "payroll";
        month: number;
        year: number;
        subject: string;
        description: string | null;
        status: "pending" | "processing" | "resolved" | "rejected";
        createdAt: string;
        response: string | undefined;
        respondedBy: string | undefined;
        respondedAt: string | undefined;
    }[]>;
    create(dto: {
        employeeId: string;
        type: 'timekeeping' | 'payroll';
        month: number;
        year: number;
        subject: string;
        description: string;
    }): Promise<{
        id: string;
        employeeId: string;
        employeeName: string;
        department: string;
        type: "timekeeping" | "payroll";
        month: number;
        year: number;
        subject: string;
        description: string | null;
        status: "pending" | "processing" | "resolved" | "rejected";
        createdAt: string;
    }>;
    respond(id: string, status: 'pending' | 'processing' | 'resolved' | 'rejected', response: string, respondedBy: string): Promise<Proposal | null>;
}
