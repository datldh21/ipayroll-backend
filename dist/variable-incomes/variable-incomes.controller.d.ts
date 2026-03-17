import { VariableIncomesService } from './variable-incomes.service';
declare class FindVariableIncomesQueryDto {
    year?: number;
    month?: number;
}
export declare class VariableIncomesController {
    private readonly variableIncomesService;
    constructor(variableIncomesService: VariableIncomesService);
    findByPeriod(query: FindVariableIncomesQueryDto): Promise<{
        id: string;
        employeeId: any;
        month: number;
        year: number;
        commission: number;
        commissionDetail: string;
        bonus: number;
        bonusDetail: string;
        otherIncome: number;
        otherIncomeDetail: string;
        otherAllowance: number;
        otherAllowanceDetail: string;
    }[]>;
    update(id: string, dto: any): Promise<import("../database/entities").VariableIncome | null>;
}
export {};
