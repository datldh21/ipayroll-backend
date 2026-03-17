import { Repository } from 'typeorm';
import { SiMonthlyRecord } from '../database/entities/si-monthly-record.entity';
export declare class SocialInsuranceService {
    private readonly repo;
    constructor(repo: Repository<SiMonthlyRecord>);
    findByPeriod(year: number, month: number): Promise<{
        id: string;
        employeeId: any;
        month: number;
        year: number;
        baseSI: number;
        bhxh: number;
        bhyt: number;
        bhtn: number;
        siEmployee: number;
        bhxhEmployer: number;
        bhytEmployer: number;
        bhtnEmployer: number;
        siEmployer: number;
        unionFee: number;
        isExempt: boolean;
        note: string;
    }[]>;
    update(id: string, dto: Partial<{
        siBase: number;
        baseSI: number;
        bhxhEmployee: number;
        bhytEmployee: number;
        bhtnEmployee: number;
        bhxh: number;
        bhyt: number;
        bhtn: number;
        bhxhEmployer: number;
        bhytEmployer: number;
        bhtnEmployer: number;
        unionFee: number;
        isExempt: boolean;
        exemptReason: string;
        note: string;
    }>): Promise<SiMonthlyRecord | null>;
}
