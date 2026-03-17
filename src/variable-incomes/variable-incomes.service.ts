import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariableIncome } from '../database/entities/variable-income.entity';

@Injectable()
export class VariableIncomesService {
  constructor(
    @InjectRepository(VariableIncome)
    private readonly repo: Repository<VariableIncome>,
  ) {}

  async findByPeriod(year: number, month: number) {
    const list = await this.repo.find({
      where: { year, month },
      relations: ['employee'],
      order: { employeeId: 'ASC' },
    });
    return list.map((v) => ({
      id: v.id,
      employeeId: (v as any).employee?.employeeCode ?? v.employeeId,
      month: v.month,
      year: v.year,
      commission: Number(v.commission),
      commissionDetail: v.commissionDetail ?? '',
      bonus: Number(v.bonus),
      bonusDetail: v.bonusDetail ?? '',
      otherIncome: Number(v.otherIncome),
      otherIncomeDetail: v.otherIncomeDetail ?? '',
      otherAllowance: Number(v.otherAllowance),
      otherAllowanceDetail: v.otherAllowanceDetail ?? '',
    }));
  }

  async update(id: string, dto: Partial<{
    commission: number;
    commissionDetail: string;
    bonus: number;
    bonusDetail: string;
    otherIncome: number;
    otherIncomeDetail: string;
    otherAllowance: number;
    otherAllowanceDetail: string;
  }>) {
    if (Object.keys(dto).length > 0) {
      await this.repo.update(id, dto as any);
    }
    return this.repo.findOne({ where: { id } });
  }
}
