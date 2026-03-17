import { Repository } from 'typeorm';
import { Timekeeping } from '../database/entities/timekeeping.entity';
export declare class TimekeepingService {
    private readonly repo;
    constructor(repo: Repository<Timekeeping>);
    findByPeriod(year: number, month: number): Promise<{
        id: string;
        employeeId: any;
        month: number;
        year: number;
        standardDays: number;
        actualDays: number;
        probationDays: number;
        officialDays: number;
        remainingLeave: number;
        unpaidLeave: number;
        unpaidLeaveProbation: number;
        unpaidLeaveOfficial: number;
    }[]>;
    update(id: string, dto: Partial<{
        standardDays: number;
        actualDays: number;
        probationDays: number;
        officialDays: number;
        remainingLeave: number;
        unpaidLeave: number;
        unpaidLeaveProbation: number;
        unpaidLeaveOfficial: number;
    }>): Promise<Timekeeping | null>;
}
