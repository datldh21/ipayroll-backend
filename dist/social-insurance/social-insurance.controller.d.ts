import { SocialInsuranceService } from './social-insurance.service';
declare class FindSiQueryDto {
    year?: number;
    month?: number;
}
export declare class SocialInsuranceController {
    private readonly socialInsuranceService;
    constructor(socialInsuranceService: SocialInsuranceService);
    findByPeriod(query: FindSiQueryDto): Promise<{
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
    update(id: string, dto: any): Promise<import("../database/entities").SiMonthlyRecord | null>;
}
export {};
