import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timekeeping } from '../database/entities/timekeeping.entity';

@Injectable()
export class TimekeepingService {
  constructor(
    @InjectRepository(Timekeeping)
    private readonly repo: Repository<Timekeeping>,
  ) {}

  async findByPeriod(year: number, month: number) {
    const list = await this.repo.find({
      where: { year, month },
      relations: ['employee'],
      order: { employeeId: 'ASC' },
    });
    return list.map((t) => ({
      id: t.id,
      employeeId: (t as any).employee?.employeeCode ?? t.employeeId,
      month: t.month,
      year: t.year,
      standardDays: t.standardDays,
      actualDays: Number(t.actualDays),
      probationDays: Number(t.probationDays),
      officialDays: Number(t.officialDays),
      remainingLeave: Number(t.remainingLeave),
      unpaidLeave: Number(t.unpaidLeave),
      unpaidLeaveProbation: Number(t.unpaidLeaveProbation),
      unpaidLeaveOfficial: Number(t.unpaidLeaveOfficial),
    }));
  }

  async update(id: string, dto: Partial<{
    standardDays: number;
    actualDays: number;
    probationDays: number;
    officialDays: number;
    remainingLeave: number;
    unpaidLeave: number;
    unpaidLeaveProbation: number;
    unpaidLeaveOfficial: number;
  }>) {
    await this.repo.update(id, dto as any);
    return this.repo.findOne({ where: { id } });
  }
}
