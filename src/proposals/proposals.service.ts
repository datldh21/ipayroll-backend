import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from '../database/entities/proposal.entity';
import { Employee } from '../database/entities/employee.entity';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal)
    private readonly repo: Repository<Proposal>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async findAll() {
    const list = await this.repo.find({
      relations: ['employee'],
      order: { createdAt: 'DESC' },
    });
    return list.map((p) => ({
      id: p.id,
      employeeId: p.employeeId,
      employeeName: p.employee?.fullName ?? '',
      department: p.employee?.department ?? '',
      type: p.type,
      month: p.month,
      year: p.year,
      subject: p.subject,
      description: p.description,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      response: p.response ?? undefined,
      respondedBy: p.respondedBy?.toString() ?? undefined,
      respondedAt: p.respondedAt?.toISOString() ?? undefined,
    }));
  }

  async create(dto: {
    employeeId: string;
    type: 'timekeeping' | 'payroll';
    month: number;
    year: number;
    subject: string;
    description: string;
  }) {
    const proposal = this.repo.create({
      ...dto,
      status: 'pending',
    });
    const saved = await this.repo.save(proposal);
    const withEmp = await this.repo.findOne({
      where: { id: saved.id },
      relations: ['employee'],
    });
    return {
      id: withEmp!.id,
      employeeId: withEmp!.employeeId,
      employeeName: withEmp!.employee?.fullName ?? '',
      department: withEmp!.employee?.department ?? '',
      type: withEmp!.type,
      month: withEmp!.month,
      year: withEmp!.year,
      subject: withEmp!.subject,
      description: withEmp!.description,
      status: withEmp!.status,
      createdAt: withEmp!.createdAt.toISOString(),
    };
  }

  async respond(id: string, status: 'pending' | 'processing' | 'resolved' | 'rejected', response: string, respondedBy: string) {
    await this.repo.update(id, {
      status,
      response,
      respondedBy,
      respondedAt: new Date(),
    });
    return this.repo.findOne({ where: { id }, relations: ['employee'] });
  }
}
