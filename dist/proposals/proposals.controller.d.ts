import { ProposalsService } from './proposals.service';
declare class CreateProposalDto {
    employeeId: string;
    type: 'timekeeping' | 'payroll';
    month: number;
    year: number;
    subject: string;
    description: string;
}
declare class RespondProposalDto {
    status: 'pending' | 'processing' | 'resolved' | 'rejected';
    response: string;
    respondedBy: string;
}
export declare class ProposalsController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalsService);
    findAll(): Promise<{
        id: string;
        employeeId: any;
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
    create(dto: CreateProposalDto): Promise<{
        id: string;
        employeeId: any;
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
    respond(id: string, dto: RespondProposalDto): Promise<import("../database/entities").Proposal | null>;
}
export {};
