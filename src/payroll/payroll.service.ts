import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PayrollBatch } from '../database/entities/payroll-batch.entity';
import { PayrollRecord } from '../database/entities/payroll-record.entity';
import { Employee } from '../database/entities/employee.entity';
import { EmployeeContract } from '../database/entities/employee-contract.entity';
import { Dependent } from '../database/entities/dependent.entity';
import { Timekeeping } from '../database/entities/timekeeping.entity';
import { SiMonthlyRecord } from '../database/entities/si-monthly-record.entity';
import { VariableIncome } from '../database/entities/variable-income.entity';
import { User } from '../database/entities/user.entity';
import { TaxBracketVersion } from '../database/entities/tax-bracket-version.entity';
import { SiRateVersion } from '../database/entities/si-rate-version.entity';
import { calculatePayrollRecord, CalcOutput } from './payroll-calculator';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(PayrollBatch)
    private readonly batchRepo: Repository<PayrollBatch>,
    @InjectRepository(PayrollRecord)
    private readonly recordRepo: Repository<PayrollRecord>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(EmployeeContract)
    private readonly contractRepo: Repository<EmployeeContract>,
    @InjectRepository(Dependent)
    private readonly dependentRepo: Repository<Dependent>,
    @InjectRepository(Timekeeping)
    private readonly timekeepingRepo: Repository<Timekeeping>,
    @InjectRepository(SiMonthlyRecord)
    private readonly siRepo: Repository<SiMonthlyRecord>,
    @InjectRepository(VariableIncome)
    private readonly variableRepo: Repository<VariableIncome>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(TaxBracketVersion)
    private readonly taxVersionRepo: Repository<TaxBracketVersion>,
    @InjectRepository(SiRateVersion)
    private readonly siVersionRepo: Repository<SiRateVersion>,
  ) {}

  async findAllBatches() {
    const batches = await this.batchRepo.find({
      relations: ['records', 'records.employee'],
      order: { year: 'DESC', month: 'DESC' },
    });

    return batches.map((b) => this.batchToResponse(b));
  }

  private recordToResponse(r: PayrollRecord) {
    return {
      id: r.id,
      employeeId: r.employeeId,
      employeeName: (r as any).employee?.fullName ?? '',
      department: (r as any).employee?.department ?? '',
      status: (r as any).employee?.status ?? '',
      month: r.batch?.month ?? 0,
      year: r.batch?.year ?? 0,
      email: (r as any).employee?.email ?? '',
      bankAccount: r.bankAccount,
      bankName: r.bankName,
      dependents: r.dependentCount,
      costAccount: r.costAccount,
      remainingLeave: Number(r.remainingLeave),
      packageBaseSalary: Number(r.pkgBaseSalary),
      packageLunch: Number(r.pkgLunch),
      packagePhone: Number(r.pkgPhone),
      packagePerfBonus: Number(r.pkgPerfBonus),
      packageTotal: Number(r.pkgTotal),
      probPackageBaseSalary: Number(r.probPkgBaseSalary),
      probPackageLunch: Number(r.probPkgLunch),
      probPackagePerfBonus: Number(r.probPkgPerfBonus),
      probPackageTotal: Number(r.probPkgTotal),
      baseSalary: Number(r.pkgBaseSalary),
      standardDays: r.standardDays,
      actualDays: Number(r.actualDays),
      probationDays: Number(r.probationDays),
      officialDays: Number(r.officialDays),
      unpaidLeaveProbation: Number(r.unpaidLeaveProbation),
      unpaidLeaveOfficial: Number(r.unpaidLeaveOfficial),
      proratedBaseSalary: Number(r.proratedBaseSalary),
      proratedPerfBonus: Number(r.proratedPerfBonus),
      proratedTotal: Number(r.proratedTotal),
      totalLunchActual: Number(r.totalLunchActual),
      totalPhoneActual: Number(r.totalPhoneActual),
      commission: Number(r.commission),
      commissionDetail: '',
      bonus: Number(r.bonus),
      bonusDetail: '',
      otherIncome: Number(r.otherIncome),
      otherIncomeDetail: '',
      otherAllowance: Number(r.otherAllowance),
      otherAllowanceDetail: '',
      totalVariableIncome: Number(r.totalVariableIncome),
      grossSalary: Number(r.grossSalary),
      nonTaxableLunch: Number(r.nonTaxableLunch),
      nonTaxablePhone: Number(r.nonTaxablePhone),
      taxableIncome: Number(r.taxableIncome),
      siBase: Number(r.siBase),
      siBhxh: Number(r.siBhxh),
      siBhyt: Number(r.siBhyt),
      siBhtn: Number(r.siBhtn),
      siEmployee: Number(r.siEmployeeTotal),
      personalDeduction: Number(r.personalDeduction),
      dependentCount: r.dependentCount,
      dependentDeduction: Number(r.dependentDeduction),
      taxMethod: r.taxMethod,
      taxAssessableIncome: Number(r.taxAssessableIncome),
      pit: Number(r.pit),
      unionFee: Number(r.unionFee),
      retroDeduction: Number(r.retroDeduction),
      retroAddition: Number(r.retroAddition),
      totalDeduction: Number(r.totalDeduction),
      netSalary: Number(r.netSalary),
      siEmployerBhxh: Number(r.siEmployerBhxh),
      siEmployerBhyt: Number(r.siEmployerBhyt),
      siEmployerBhtn: Number(r.siEmployerBhtn),
      siEmployer: Number(r.siEmployerTotal),
      employerUnionFee: Number(r.employerUnionFee),
      totalEmployerCost: Number(r.totalEmployerCost),
    };
  }

  private batchToResponse(b: PayrollBatch) {
    const records = (b as any).records ?? [];
    return {
      id: b.id,
      month: b.month,
      year: b.year,
      status: b.status,
      createdBy: (b as any).createdByUser?.name ?? '',
      createdAt: b.createdAt.toISOString(),
      approvedBy: (b as any).approvedByUser?.name ?? undefined,
      approvedAt: b.approvedAt?.toISOString() ?? undefined,
      totalEmployees: b.totalEmployees,
      totalGross: Number(b.totalGross),
      totalNet: Number(b.totalNet),
      totalTax: Number(b.totalPit),
      totalSI: Number(b.totalSiEmployee),
      totalEmployerCost: Number(b.totalEmployerCost),
      records: records.map((r: PayrollRecord) => this.recordToResponse(r)),
    };
  }

  async generatePayroll(month: number, year: number, createdByName: string) {
    const user = await this.userRepo.findOne({
      where: { name: createdByName },
    });
    if (!user) {
      throw new NotFoundException(`User "${createdByName}" not found`);
    }

    const taxVersion = await this.taxVersionRepo.findOne({
      where: { effectiveTo: IsNull() },
    });
    const siVersion = await this.siVersionRepo.findOne({
      where: { effectiveTo: IsNull() },
    });

    const employees = await this.employeeRepo.find({
      where: { deletedAt: IsNull() },
    });

    const std = [10, 12].includes(month) ? 22 : 20;

    const records: Partial<PayrollRecord>[] = [];

    for (const emp of employees) {
      const contract = await this.contractRepo.findOne({
        where: { employeeId: emp.id },
        order: { effectiveDate: 'DESC' },
      });
      const baseSalary = Number(contract?.baseSalary ?? 0);

      const depCount = await this.dependentRepo
        .createQueryBuilder('d')
        .where('d.employee_id = :empId', { empId: emp.id })
        .andWhere('d.registered_from <= :endOfMonth', {
          endOfMonth: new Date(year, month, 0),
        })
        .andWhere(
          '(d.registered_to IS NULL OR d.registered_to >= :startOfMonth)',
          {
            startOfMonth: new Date(year, month - 1, 1),
          },
        )
        .getCount();

      const tk = await this.timekeepingRepo.findOne({
        where: { employeeId: emp.id, year, month },
      });
      const si = await this.siRepo.findOne({
        where: { employeeId: emp.id, year, month },
      });
      const vi = await this.variableRepo.findOne({
        where: { employeeId: emp.id, year, month },
      });

      if (!tk || !si) continue;

      const result = calculatePayrollRecord({
        employee: {
          id: emp.id,
          fullName: emp.fullName,
          email: emp.email,
          bankAccount: emp.bankAccount,
          bankName: emp.bankName,
          department: emp.department,
          status: emp.status as any,
          dependents: depCount,
          costAccount: emp.costAccount,
        },
        timekeeping: {
          standardDays: tk.standardDays,
          actualDays: Number(tk.actualDays),
          probationDays: Number(tk.probationDays),
          officialDays: Number(tk.officialDays),
          remainingLeave: Number(tk.remainingLeave),
          unpaidLeaveProbation: Number(tk.unpaidLeaveProbation),
          unpaidLeaveOfficial: Number(tk.unpaidLeaveOfficial),
        },
        socialInsurance: {
          baseSI: Number(si.siBase),
          bhxh: Number(si.bhxhEmployee),
          bhyt: Number(si.bhytEmployee),
          bhtn: Number(si.bhtnEmployee),
          siEmployee: Number(si.siEmployeeTotal),
          bhxhEmployer: Number(si.bhxhEmployer),
          bhytEmployer: Number(si.bhytEmployer),
          bhtnEmployer: Number(si.bhtnEmployer),
          siEmployer: Number(si.siEmployerTotal),
          unionFee: Number(si.unionFee),
        },
        variableIncome: {
          commission: vi ? Number(vi.commission) : 0,
          commissionDetail: vi?.commissionDetail ?? '',
          bonus: vi ? Number(vi.bonus) : 0,
          bonusDetail: vi?.bonusDetail ?? '',
          otherIncome: vi ? Number(vi.otherIncome) : 0,
          otherIncomeDetail: vi?.otherIncomeDetail ?? '',
          otherAllowance: vi ? Number(vi.otherAllowance) : 0,
          otherAllowanceDetail: vi?.otherAllowanceDetail ?? '',
        },
        grossPackage: {
          baseSalary: baseSalary,
          lunch: 1_000_000,
          phone: 500_000,
        },
      });

      records.push({
        employeeId: emp.id,
        batchId: '',
        ...this.calcOutputToRecord(result),
        costAccount: emp.costAccount,
        bankAccount: emp.bankAccount,
        bankName: emp.bankName,
      });
    }

    let batch = await this.batchRepo.findOne({
      where: { year, month },
    });

    if (batch) {
      await this.recordRepo.delete({ batchId: batch.id });
    } else {
      batch = this.batchRepo.create({
        year,
        month,
        status: 'draft',
        taxBracketVersionId: taxVersion?.id ?? null,
        siRateVersionId: siVersion?.id ?? null,
        totalEmployees: 0,
        totalGross: 0,
        totalNet: 0,
        totalPit: 0,
        totalSiEmployee: 0,
        totalEmployerCost: 0,
        createdBy: user.id,
      });
      batch = await this.batchRepo.save(batch);
    }

    const savedRecords: PayrollRecord[] = [];
    for (const r of records) {
      const rec = this.recordRepo.create({
        ...r,
        batchId: batch!.id,
      });
      savedRecords.push(await this.recordRepo.save(rec));
    }

    batch.totalEmployees = savedRecords.length;
    batch.totalGross = savedRecords.reduce(
      (s, r) => s + Number(r.grossSalary),
      0,
    );
    batch.totalNet = savedRecords.reduce((s, r) => s + Number(r.netSalary), 0);
    batch.totalPit = savedRecords.reduce((s, r) => s + Number(r.pit), 0);
    batch.totalSiEmployee = savedRecords.reduce(
      (s, r) => s + Number(r.siEmployeeTotal),
      0,
    );
    batch.totalEmployerCost = savedRecords.reduce(
      (s, r) => s + Number(r.totalEmployerCost),
      0,
    );
    await this.batchRepo.save(batch);

    const fullBatch = await this.batchRepo.findOne({
      where: { id: batch!.id },
      relations: [
        'records',
        'records.employee',
        'createdByUser',
        'approvedByUser',
      ],
    });

    return this.batchToResponse(fullBatch!);
  }

  private calcOutputToRecord(o: CalcOutput): Partial<PayrollRecord> {
    return {
      pkgBaseSalary: o.pkgBaseSalary,
      pkgLunch: o.pkgLunch,
      pkgPhone: o.pkgPhone,
      pkgPerfBonus: o.pkgPerfBonus,
      pkgTotal: o.pkgTotal,
      probPkgBaseSalary: o.probPkgBaseSalary,
      probPkgLunch: o.probPkgLunch,
      probPkgPerfBonus: o.probPkgPerfBonus,
      probPkgTotal: o.probPkgTotal,
      standardDays: o.standardDays,
      actualDays: o.actualDays,
      probationDays: o.probationDays,
      officialDays: o.officialDays,
      unpaidLeaveProbation: o.unpaidLeaveProbation,
      unpaidLeaveOfficial: o.unpaidLeaveOfficial,
      remainingLeave: o.remainingLeave,
      proratedBaseSalary: o.proratedBaseSalary,
      proratedPerfBonus: o.proratedPerfBonus,
      totalLunchActual: o.totalLunchActual,
      totalPhoneActual: o.totalPhoneActual,
      proratedTotal: o.proratedTotal,
      commission: o.commission,
      bonus: o.bonus,
      otherIncome: o.otherIncome,
      otherAllowance: o.otherAllowance,
      totalVariableIncome: o.totalVariableIncome,
      grossSalary: o.grossSalary,
      nonTaxableLunch: o.nonTaxableLunch,
      nonTaxablePhone: o.nonTaxablePhone,
      taxableIncome: o.taxableIncome,
      siBase: o.siBase,
      siBhxh: o.siBhxh,
      siBhyt: o.siBhyt,
      siBhtn: o.siBhtn,
      siEmployeeTotal: o.siEmployeeTotal,
      personalDeduction: o.personalDeduction,
      dependentCount: o.dependentCount,
      dependentDeduction: o.dependentDeduction,
      taxMethod: o.taxMethod,
      taxAssessableIncome: o.taxAssessableIncome,
      pit: o.pit,
      unionFee: o.unionFee,
      retroDeduction: o.retroDeduction,
      retroAddition: o.retroAddition,
      totalDeduction: o.totalDeduction,
      netSalary: o.netSalary,
      siEmployerBhxh: o.siEmployerBhxh,
      siEmployerBhyt: o.siEmployerBhyt,
      siEmployerBhtn: o.siEmployerBhtn,
      siEmployerTotal: o.siEmployerTotal,
      employerUnionFee: o.employerUnionFee,
      totalEmployerCost: o.totalEmployerCost,
    };
  }

  async approveBatch(id: string, approvedByName: string) {
    const user = await this.userRepo.findOne({
      where: { name: approvedByName },
    });
    if (!user) {
      throw new NotFoundException(`User "${approvedByName}" not found`);
    }

    const batch = await this.batchRepo.findOne({ where: { id } });
    if (!batch) {
      throw new NotFoundException(`Batch ${id} not found`);
    }

    batch.status = 'approved';
    batch.approvedBy = user.id;
    batch.approvedAt = new Date();
    await this.batchRepo.save(batch);

    return this.findAllBatches();
  }

  async updateRecord(
    batchId: string,
    recordId: string,
    changes: {
      commission?: number;
      commissionDetail?: string;
      bonus?: number;
      bonusDetail?: string;
      otherIncome?: number;
      otherIncomeDetail?: string;
      otherAllowance?: number;
      otherAllowanceDetail?: string;
      retroDeduction?: number;
      retroAddition?: number;
      remainingLeave?: number;
    },
  ) {
    const record = await this.recordRepo.findOne({
      where: { id: recordId, batchId },
      relations: ['batch', 'employee'],
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }

    const batch = record.batch as PayrollBatch;
    const emp = record.employee as Employee;

    const tk = await this.timekeepingRepo.findOne({
      where: { employeeId: emp.id, year: batch.year, month: batch.month },
    });
    const si = await this.siRepo.findOne({
      where: { employeeId: emp.id, year: batch.year, month: batch.month },
    });
    const vi = await this.variableRepo.findOne({
      where: { employeeId: emp.id, year: batch.year, month: batch.month },
    });

    if (!tk || !si) {
      throw new NotFoundException('Timekeeping or SI record not found');
    }

    const depCount = await this.dependentRepo
      .createQueryBuilder('d')
      .where('d.employee_id = :empId', { empId: emp.id })
      .andWhere('d.registered_from <= :endOfMonth', {
        endOfMonth: new Date(batch.year, batch.month, 0),
      })
      .andWhere(
        '(d.registered_to IS NULL OR d.registered_to >= :startOfMonth)',
        {
          startOfMonth: new Date(batch.year, batch.month - 1, 1),
        },
      )
      .getCount();

    const contract = await this.contractRepo.findOne({
      where: { employeeId: emp.id },
      order: { effectiveDate: 'DESC' },
    });
    const baseSalary = Number(contract?.baseSalary ?? 0);

    const result = calculatePayrollRecord({
      employee: {
        id: emp.id,
        fullName: emp.fullName,
        email: emp.email,
        bankAccount: emp.bankAccount,
        bankName: emp.bankName,
        department: emp.department,
        status: emp.status as any,
        dependents: depCount,
        costAccount: emp.costAccount,
      },
      timekeeping: {
        standardDays: tk.standardDays,
        actualDays: Number(tk.actualDays),
        probationDays: Number(tk.probationDays),
        officialDays: Number(tk.officialDays),
        remainingLeave: changes.remainingLeave ?? Number(tk.remainingLeave),
        unpaidLeaveProbation: Number(tk.unpaidLeaveProbation),
        unpaidLeaveOfficial: Number(tk.unpaidLeaveOfficial),
      },
      socialInsurance: {
        baseSI: Number(si.siBase),
        bhxh: Number(si.bhxhEmployee),
        bhyt: Number(si.bhytEmployee),
        bhtn: Number(si.bhtnEmployee),
        siEmployee: Number(si.siEmployeeTotal),
        bhxhEmployer: Number(si.bhxhEmployer),
        bhytEmployer: Number(si.bhytEmployer),
        bhtnEmployer: Number(si.bhtnEmployer),
        siEmployer: Number(si.siEmployerTotal),
        unionFee: Number(si.unionFee),
      },
      variableIncome: {
        commission: changes.commission ?? Number(record.commission),
        commissionDetail: changes.commissionDetail ?? '',
        bonus: changes.bonus ?? Number(record.bonus),
        bonusDetail: changes.bonusDetail ?? '',
        otherIncome: changes.otherIncome ?? Number(record.otherIncome),
        otherIncomeDetail: changes.otherIncomeDetail ?? '',
        otherAllowance: changes.otherAllowance ?? Number(record.otherAllowance),
        otherAllowanceDetail: changes.otherAllowanceDetail ?? '',
      },
      grossPackage: {
        baseSalary,
        lunch: 1_000_000,
        phone: 500_000,
      },
      retroDeduction: changes.retroDeduction ?? Number(record.retroDeduction),
      retroAddition: changes.retroAddition ?? Number(record.retroAddition),
    });

    Object.assign(record, this.calcOutputToRecord(result));
    if (changes.remainingLeave != null) {
      record.remainingLeave = changes.remainingLeave as any;
    }
    record.isManuallyAdjusted = true;
    await this.recordRepo.save(record);

    const sums = await this.recordRepo
      .createQueryBuilder('r')
      .select('SUM(r.grossSalary)', 'totalGross')
      .addSelect('SUM(r.netSalary)', 'totalNet')
      .addSelect('SUM(r.pit)', 'totalPit')
      .addSelect('SUM(r.siEmployeeTotal)', 'totalSiEmployee')
      .addSelect('SUM(r.totalEmployerCost)', 'totalEmployerCost')
      .where('r.batchId = :batchId', { batchId })
      .getRawOne();

    await this.batchRepo.update(batchId, {
      totalGross: Number(sums?.totalGross ?? 0),
      totalNet: Number(sums?.totalNet ?? 0),
      totalPit: Number(sums?.totalPit ?? 0),
      totalSiEmployee: Number(sums?.totalSiEmployee ?? 0),
      totalEmployerCost: Number(sums?.totalEmployerCost ?? 0),
    });

    const updated = await this.batchRepo.findOne({
      where: { id: batchId },
      relations: [
        'records',
        'records.employee',
        'createdByUser',
        'approvedByUser',
      ],
    });
    return this.batchToResponse(updated!);
  }
}
