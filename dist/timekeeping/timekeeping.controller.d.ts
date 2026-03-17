import { TimekeepingService } from './timekeeping.service';
declare class FindTimekeepingQueryDto {
    year?: number;
    month?: number;
}
export declare class TimekeepingController {
    private readonly timekeepingService;
    constructor(timekeepingService: TimekeepingService);
    findByPeriod(query: FindTimekeepingQueryDto): Promise<{
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
    update(id: string, dto: any): Promise<import("../database/entities").Timekeeping | null>;
}
export {};
