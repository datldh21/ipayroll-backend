import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiMonthlyRecord } from '../database/entities/si-monthly-record.entity';

@Injectable()
export class SocialInsuranceService {
  constructor(
    @InjectRepository(SiMonthlyRecord)
    private readonly repo: Repository<SiMonthlyRecord>,
  ) {}

  async findByPeriod(year: number, month: number) {
    const list = await this.repo.find({
      where: { year, month },
      relations: ['employee'],
      order: { employeeId: 'ASC' },
    });
    return list.map((s) => ({
      id: s.id,
      employeeId: (s as any).employee?.employeeCode ?? s.employeeId,
      month: s.month,
      year: s.year,
      baseSI: Number(s.siBase),
      bhxh: Number(s.bhxhEmployee),
      bhyt: Number(s.bhytEmployee),
      bhtn: Number(s.bhtnEmployee),
      siEmployee: Number(s.siEmployeeTotal),
      bhxhEmployer: Number(s.bhxhEmployer),
      bhytEmployer: Number(s.bhytEmployer),
      bhtnEmployer: Number(s.bhtnEmployer),
      siEmployer: Number(s.siEmployerTotal),
      unionFee: Number(s.unionFee),
      isExempt: s.isExempt,
      note: s.exemptReason ?? '',
    }));
  }

  async update(id: string, dto: Partial<{
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
  }>) {
    const mapped: Record<string, any> = {};
    const v = (key: string, val: any) => { if (val != null) mapped[key] = val; };
    v('siBase', dto.siBase ?? dto.baseSI);
    v('bhxhEmployee', dto.bhxhEmployee ?? dto.bhxh);
    v('bhytEmployee', dto.bhytEmployee ?? dto.bhyt);
    v('bhtnEmployee', dto.bhtnEmployee ?? dto.bhtn);
    v('bhxhEmployer', dto.bhxhEmployer);
    v('bhytEmployer', dto.bhytEmployer);
    v('bhtnEmployer', dto.bhtnEmployer);
    v('unionFee', dto.unionFee);
    v('isExempt', dto.isExempt);
    v('exemptReason', dto.exemptReason ?? dto.note);
    if (Object.keys(mapped).length > 0) {
      await this.repo.update(id, mapped);
    }
    return this.repo.findOne({ where: { id } });
  }
}
