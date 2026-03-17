import { Repository } from 'typeorm';
import { VariableIncome } from '../database/entities/variable-income.entity';
export declare class VariableIncomesService {
    private readonly repo;
    constructor(repo: Repository<VariableIncome>);
    findByPeriod(year: number, month: number): Promise<{
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
    update(id: string, dto: Partial<{
        commission: number;
        commissionDetail: string;
        bonus: number;
        bonusDetail: string;
        otherIncome: number;
        otherIncomeDetail: string;
        otherAllowance: number;
        otherAllowanceDetail: string;
    }>): Promise<VariableIncome | null>;
}
