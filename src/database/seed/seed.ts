import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

import { User } from '../entities/user.entity';
import { Employee } from '../entities/employee.entity';
import { EmployeeContract } from '../entities/employee-contract.entity';
import { Timekeeping } from '../entities/timekeeping.entity';
import { SiMonthlyRecord } from '../entities/si-monthly-record.entity';
import { SiRateVersion } from '../entities/si-rate-version.entity';
import { SiRate } from '../entities/si-rate.entity';
import { TaxBracketVersion } from '../entities/tax-bracket-version.entity';
import { TaxBracket } from '../entities/tax-bracket.entity';
import { PayrollConfig } from '../entities/payroll-config.entity';
import { WorkingDayCalendar } from '../entities/working-day-calendar.entity';
import { VariableIncome } from '../entities/variable-income.entity';
import { PayrollBatch } from '../entities/payroll-batch.entity';
import { PayrollRecord } from '../entities/payroll-record.entity';
import { Proposal } from '../entities/proposal.entity';

const PERSONAL_DEDUCTION = 15_500_000;
const DEPENDENT_DEDUCTION = 6_200_000;
const SI_MIN_BASE = 5_310_000;
const SI_BHXH_RATE = 0.08;
const SI_BHYT_RATE = 0.015;
const SI_BHTN_RATE = 0.01;
const SI_RATE_EMPLOYEE = 0.105;
const SI_BHXH_EMPLOYER_RATE = 0.175;
const SI_BHYT_EMPLOYER_RATE = 0.03;
const SI_BHTN_EMPLOYER_RATE = 0.01;
const SI_RATE_EMPLOYER = 0.215;
const UNION_FEE_RATE = 0.02;
const FLAT_TAX_RATE = 0.1;

const TAX_BRACKETS = [
  { min: 0, max: 5_000_000, rate: 0.05 },
  { min: 5_000_000, max: 10_000_000, rate: 0.1 },
  { min: 10_000_000, max: 18_000_000, rate: 0.15 },
  { min: 18_000_000, max: 32_000_000, rate: 0.2 },
  { min: 32_000_000, max: 52_000_000, rate: 0.25 },
  { min: 52_000_000, max: 80_000_000, rate: 0.3 },
  { min: 80_000_000, max: Infinity, rate: 0.35 },
];

type EmployeeStatus =
  | 'chinh_thuc'
  | 'thai_san'
  | 'nghi_viec_ct'
  | 'het_thu_viec'
  | 'thu_viec'
  | 'nghi_viec_tv';

function calculateProgressiveTax(taxAssessableIncome: number): number {
  if (taxAssessableIncome <= 0) return 0;
  let remaining = taxAssessableIncome;
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    const bracketSize = bracket.max - bracket.min;
    const taxableInBracket = Math.min(remaining, bracketSize);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    if (remaining <= 0) break;
  }
  return Math.round(tax);
}

function prorate(
  packageAmount: number,
  standardDays: number,
  actualDays: number,
): number {
  if (standardDays <= 0 || actualDays <= 0) return 0;
  return Math.round((packageAmount / standardDays) * actualDays);
}

function getTaxMethod(status: EmployeeStatus): 'progressive' | 'flat_10' {
  if (['chinh_thuc', 'het_thu_viec', 'thai_san'].includes(status)) {
    return 'progressive';
  }
  return 'flat_10';
}

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'ipayroll',
    entities: [
      User,
      Employee,
      EmployeeContract,
      Timekeeping,
      SiMonthlyRecord,
      SiRateVersion,
      SiRate,
      TaxBracketVersion,
      TaxBracket,
      PayrollConfig,
      WorkingDayCalendar,
      VariableIncome,
      PayrollBatch,
      PayrollRecord,
      Proposal,
    ],
    synchronize: false,
  });

  await dataSource.initialize();

  // Ensure all tables exist (creates tables from entities if missing)
  await dataSource.synchronize();

  const userRepo = dataSource.getRepository(User);
  const employeeRepo = dataSource.getRepository(Employee);
  const contractRepo = dataSource.getRepository(EmployeeContract);
  const timekeepingRepo = dataSource.getRepository(Timekeeping);
  const siRecordRepo = dataSource.getRepository(SiMonthlyRecord);
  const siVersionRepo = dataSource.getRepository(SiRateVersion);
  const siRateRepo = dataSource.getRepository(SiRate);
  const taxVersionRepo = dataSource.getRepository(TaxBracketVersion);
  const taxBracketRepo = dataSource.getRepository(TaxBracket);
  const configRepo = dataSource.getRepository(PayrollConfig);
  const calendarRepo = dataSource.getRepository(WorkingDayCalendar);
  const variableRepo = dataSource.getRepository(VariableIncome);
  const batchRepo = dataSource.getRepository(PayrollBatch);
  const recordRepo = dataSource.getRepository(PayrollRecord);
  const proposalRepo = dataSource.getRepository(Proposal);

  // 1. Users
  const users = await userRepo.save([
    userRepo.create({
      name: 'Nguyễn Thị Hiền',
      email: 'hien.nguyen@company.vn',
      role: 'cb_specialist',
    }),
    userRepo.create({
      name: 'Trần Thị Nguyệt',
      email: 'nguyet.tran@company.vn',
      role: 'manager',
    }),
  ]);
  const user1 = users[0];
  const user2 = users[1];

  // 2. Config
  const configs = [
    { configKey: 'personal_deduction', configValue: 15_500_000 },
    { configKey: 'dependent_deduction', configValue: 6_200_000 },
    { configKey: 'si_min_base', configValue: 5_310_000 },
    { configKey: 'si_base_ratio', configValue: 0.5 },
    { configKey: 'lunch_nontaxable_limit', configValue: 1_000_000 },
    { configKey: 'phone_nontaxable_limit', configValue: 500_000 },
    { configKey: 'flat_pit_rate', configValue: 0.1 },
    { configKey: 'standard_days_default', configValue: 20 },
  ];
  for (const c of configs) {
    await configRepo.save(
      configRepo.create({
        ...c,
        effectiveFrom: new Date('2020-01-01'),
        effectiveTo: null,
      }),
    );
  }

  // 3. Tax brackets
  const taxVersion = await taxVersionRepo.save(
    taxVersionRepo.create({
      name: 'Biểu thuế TNCN 2024',
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
    }),
  );
  const bracketData = [
    [0, 5_000_000, 0.05],
    [5_000_000, 10_000_000, 0.1],
    [10_000_000, 18_000_000, 0.15],
    [18_000_000, 32_000_000, 0.2],
    [32_000_000, 52_000_000, 0.25],
    [52_000_000, 80_000_000, 0.3],
    [80_000_000, null, 0.35],
  ];
  for (let i = 0; i < bracketData.length; i++) {
    const row = bracketData[i];
    const bracket = new TaxBracket();
    bracket.versionId = taxVersion.id;
    bracket.bracketOrder = i + 1;
    bracket.incomeFrom = row[0] as number;
    bracket.incomeTo = row[1] as number | null;
    bracket.rate = row[2] as number;
    await taxBracketRepo.save(bracket);
  }

  // 4. SI rates
  const siVersion = await siVersionRepo.save(
    siVersionRepo.create({
      name: 'Tỷ lệ BHXH 2024',
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
    }),
  );
  const siRates = [
    ['bhxh', 'employee', 0.08],
    ['bhyt', 'employee', 0.015],
    ['bhtn', 'employee', 0.01],
    ['bhxh', 'employer', 0.175],
    ['bhyt', 'employer', 0.03],
    ['bhtn', 'employer', 0.01],
    ['union_fee', 'employer', 0.02],
  ];
  for (const [siType, party, rate] of siRates) {
    const sr = new SiRate();
    sr.versionId = siVersion.id;
    sr.siType = siType as 'bhxh' | 'bhyt' | 'bhtn' | 'union_fee';
    sr.party = party as 'employee' | 'employer';
    sr.rate = Number(rate);
    await siRateRepo.save(sr);
  }

  // 5. Working day calendar
  const months = [
    [10, 2025, 22],
    [11, 2025, 20],
    [12, 2025, 22],
    [1, 2026, 20],
    [2, 2026, 20],
  ];
  for (const [month, year, std] of months) {
    await calendarRepo.save(
      calendarRepo.create({ year, month, standardDays: std }),
    );
  }

  // 6. Employees
  const empData: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    number,
    string,
    string,
    string,
    string,
    number,
    string,
  ][] = [
    [
      'EMP001',
      'Nguyễn Văn An',
      'an.nguyen@company.vn',
      '0901234567',
      '1234567890',
      'Vietcombank',
      'Phòng Kinh doanh',
      'Chuyên viên Kinh doanh',
      'Senior',
      25_000_000,
      'chinh_thuc',
      '2022-03-01',
      '2022-05-01',
      '',
      2,
      '6421',
    ],
    [
      'EMP002',
      'Trần Thị Bích',
      'bich.tran@company.vn',
      '0901234568',
      '2345678901',
      'Techcombank',
      'Phòng Marketing',
      'Trưởng phòng Marketing',
      'Manager',
      35_000_000,
      'chinh_thuc',
      '2021-06-15',
      '2021-08-15',
      '',
      1,
      '6421',
    ],
    [
      'EMP003',
      'Lê Hoàng Cường',
      'cuong.le@company.vn',
      '0901234569',
      '3456789012',
      'BIDV',
      'Phòng Kỹ thuật',
      'Lập trình viên',
      'Junior',
      15_000_000,
      'thu_viec',
      '2026-01-10',
      '',
      '',
      0,
      '6422',
    ],
    [
      'EMP004',
      'Phạm Minh Dũng',
      'dung.pham@company.vn',
      '0901234570',
      '4567890123',
      'ACB',
      'Phòng Kỹ thuật',
      'Kỹ sư DevOps',
      'Mid',
      20_000_000,
      'het_thu_viec',
      '2025-11-10',
      '2026-02-10',
      '',
      0,
      '6422',
    ],
    [
      'EMP005',
      'Hoàng Thị Lan',
      'lan.hoang@company.vn',
      '0901234571',
      '5678901234',
      'Vietcombank',
      'Phòng Nhân sự',
      'Chuyên viên C&B',
      'Senior',
      22_000_000,
      'thai_san',
      '2020-01-15',
      '2020-03-15',
      '',
      1,
      '6423',
    ],
    [
      'EMP006',
      'Vũ Đức Minh',
      'minh.vu@company.vn',
      '0901234572',
      '6789012345',
      'MB Bank',
      'Phòng Kinh doanh',
      'Chuyên viên Kinh doanh',
      'Mid',
      18_000_000,
      'nghi_viec_ct',
      '2023-04-01',
      '2023-06-01',
      '2026-02-03',
      0,
      '6421',
    ],
    [
      'EMP007',
      'Đỗ Thị Mai',
      'mai.do@company.vn',
      '0901234573',
      '7890123456',
      'Sacombank',
      'Phòng Tài chính',
      'Kế toán viên',
      'Senior',
      28_000_000,
      'chinh_thuc',
      '2021-09-01',
      '2021-11-01',
      '',
      2,
      '6424',
    ],
    [
      'EMP008',
      'Bùi Quang Huy',
      'huy.bui@company.vn',
      '0901234574',
      '8901234567',
      'VPBank',
      'Phòng Kỹ thuật',
      'QA Engineer',
      'Junior',
      12_000_000,
      'nghi_viec_tv',
      '2026-01-05',
      '',
      '2026-02-05',
      0,
      '6422',
    ],
    [
      'EMP009',
      'Nguyễn Thị Hương',
      'huong.nguyen@company.vn',
      '0901234575',
      '9012345678',
      'Techcombank',
      'Phòng Marketing',
      'Content Creator',
      'Mid',
      16_000_000,
      'chinh_thuc',
      '2023-07-01',
      '2023-09-01',
      '',
      0,
      '6421',
    ],
    [
      'EMP010',
      'Trịnh Văn Phú',
      'phu.trinh@company.vn',
      '0901234576',
      '0123456789',
      'BIDV',
      'Phòng Kinh doanh',
      'Giám đốc Kinh doanh',
      'Director',
      50_000_000,
      'chinh_thuc',
      '2019-01-15',
      '2019-03-15',
      '',
      3,
      '6421',
    ],
  ];

  const employees: Employee[] = [];
  for (const d of empData) {
    const emp = await employeeRepo.save(
      employeeRepo.create({
        employeeCode: d[0],
        fullName: d[1],
        email: d[2],
        phone: d[3],
        bankAccount: d[4],
        bankName: d[5],
        department: d[6],
        position: d[7],
        level: d[8],
        orgLevel1: 'Công ty ABC',
        orgLevel2: d[6]?.includes('Kỹ thuật')
          ? 'Khối Công nghệ'
          : d[6]?.includes('Kinh doanh')
            ? 'Khối Kinh doanh'
            : 'Khối Vận hành',
        orgLevel3: d[6],
        orgLevel4: '',
        orgLevel5: '',
        status: d[10] as EmployeeStatus,
        onboardDate: d[11] ? new Date(d[11] as string) : null,
        officialDate: d[12] ? new Date(d[12] as string) : null,
        lastWorkingDate: d[13] ? new Date(d[13] as string) : null,
        costAccount: d[15],
      }),
    );
    employees.push(emp);
    await contractRepo.save(
      contractRepo.create({
        employeeId: emp.id,
        contractType:
          emp.status === 'thu_viec' || emp.status === 'nghi_viec_tv'
            ? 'hdtv'
            : 'hdld',
        baseSalary: d[9] as number,
        lunchAllowance: 1_000_000,
        phoneAllowance: 500_000,
        effectiveDate: emp.onboardDate || new Date(),
        endDate: null,
      }),
    );
  }

  const empMap = new Map(employees.map((e) => [e.employeeCode, e]));
  const empBaseMap = new Map(empData.map((d) => [d[0], d[9] as number]));
  const empDependentsMap = new Map(empData.map((d) => [d[0], d[14] as number]));

  const batchMonths = [
    [10, 2025],
    [11, 2025],
    [12, 2025],
    [1, 2026],
    [2, 2026],
  ] as [number, number][];

  // 7. Timekeeping - create for all batch months
  const tkDataByMonth: Record<
    string,
    Record<
      string,
      {
        actual: number;
        prob: number;
        off: number;
        leave: number;
        unpaid: number;
        unpaidProb: number;
        unpaidOff: number;
      }
    >
  > = {
    '2026-2': {
      EMP001: {
        actual: 20,
        prob: 0,
        off: 20,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP002: {
        actual: 20,
        prob: 0,
        off: 20,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP003: {
        actual: 18,
        prob: 18,
        off: 0,
        leave: 0,
        unpaid: 2,
        unpaidProb: 2,
        unpaidOff: 0,
      },
      EMP004: {
        actual: 20,
        prob: 7,
        off: 13,
        leave: 0,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP005: {
        actual: 0,
        prob: 0,
        off: 0,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP006: {
        actual: 3,
        prob: 0,
        off: 3,
        leave: 0,
        unpaid: 17,
        unpaidProb: 0,
        unpaidOff: 17,
      },
      EMP007: {
        actual: 20,
        prob: 0,
        off: 20,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP008: {
        actual: 3,
        prob: 3,
        off: 0,
        leave: 0,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP009: {
        actual: 20,
        prob: 0,
        off: 20,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
      EMP010: {
        actual: 20,
        prob: 0,
        off: 20,
        leave: 3,
        unpaid: 0,
        unpaidProb: 0,
        unpaidOff: 0,
      },
    },
    '2025-10': {},
    '2025-11': {},
    '2025-12': {},
    '2026-1': {},
  };

  // Default tk for standard months
  for (const emp of employees) {
    for (const [month, year] of batchMonths) {
      const key = `${year}-${month}`;
      const std = [10, 12].includes(month) ? 22 : 20;
      let tk = tkDataByMonth[key]?.[emp.employeeCode];
      if (!tk) {
        if (emp.status === 'thai_san')
          tk = {
            actual: 0,
            prob: 0,
            off: 0,
            leave: 3,
            unpaid: 0,
            unpaidProb: 0,
            unpaidOff: 0,
          };
        else if (emp.status === 'nghi_viec_tv')
          tk = {
            actual: 3,
            prob: 3,
            off: 0,
            leave: 0,
            unpaid: 0,
            unpaidProb: 0,
            unpaidOff: 0,
          };
        else if (emp.status === 'nghi_viec_ct')
          tk = {
            actual: 3,
            prob: 0,
            off: 3,
            leave: 0,
            unpaid: 17,
            unpaidProb: 0,
            unpaidOff: 17,
          };
        else if (
          emp.status === 'het_thu_viec' &&
          !(month === 2 && year === 2026)
        )
          tk = {
            actual: std,
            prob: std,
            off: 0,
            leave: 0,
            unpaid: 0,
            unpaidProb: 0,
            unpaidOff: 0,
          };
        else if (emp.status === 'thu_viec')
          tk = {
            actual: std - 2,
            prob: std - 2,
            off: 0,
            leave: 0,
            unpaid: 2,
            unpaidProb: 2,
            unpaidOff: 0,
          };
        else
          tk = {
            actual: std,
            prob: 0,
            off: std,
            leave: 3,
            unpaid: 0,
            unpaidProb: 0,
            unpaidOff: 0,
          };
      }
      await timekeepingRepo.save(
        timekeepingRepo.create({
          employeeId: emp.id,
          year,
          month,
          standardDays: std,
          actualDays: tk.actual,
          probationDays: tk.prob,
          officialDays: tk.off,
          remainingLeave: tk.leave,
          unpaidLeave: tk.unpaid,
          unpaidLeaveProbation: tk.unpaidProb,
          unpaidLeaveOfficial: tk.unpaidOff,
        }),
      );
    }
  }

  // 8. SI records for all batch months
  const VARIABLE_MULTIPLIERS: Record<number, number> = {
    10: 0.8,
    11: 0.9,
    12: 1.5,
    1: 0.7,
    2: 1.0,
  };
  for (const emp of employees) {
    const base = empBaseMap.get(emp.employeeCode) ?? 0;
    const realSiBase = Math.max(base * 0.5, SI_MIN_BASE);
    const isExempt = ['thai_san', 'thu_viec', 'nghi_viec_tv'].includes(
      emp.status,
    );

    let bhxhE = 0,
      bhytE = 0,
      bhtnE = 0,
      bhxhEr = 0,
      bhytEr = 0,
      bhtnEr = 0,
      unionFee = 0;

    if (!isExempt) {
      const tkFeb = tkDataByMonth['2026-2']?.[emp.employeeCode];
      const unpaidLeave = tkFeb?.unpaid ?? 0;
      if (emp.status === 'nghi_viec_ct' && unpaidLeave > 14) {
        bhytE = Math.round(realSiBase * SI_BHYT_RATE);
        bhytEr = Math.round(realSiBase * SI_BHYT_EMPLOYER_RATE);
      } else {
        bhxhE = Math.round(realSiBase * SI_BHXH_RATE);
        bhytE = Math.round(realSiBase * SI_BHYT_RATE);
        bhtnE = Math.round(realSiBase * SI_BHTN_RATE);
        bhxhEr = Math.round(realSiBase * SI_BHXH_EMPLOYER_RATE);
        bhytEr = Math.round(realSiBase * SI_BHYT_EMPLOYER_RATE);
        bhtnEr = Math.round(realSiBase * SI_BHTN_EMPLOYER_RATE);
        unionFee = Math.round(realSiBase * UNION_FEE_RATE);
      }
    }

    await siRecordRepo.save(
      siRecordRepo.create({
        employeeId: emp.id,
        year: 2026,
        month: 2,
        siBase: realSiBase,
        isExempt,
        exemptReason: isExempt
          ? emp.status === 'thai_san'
            ? 'Thai sản'
            : 'Thử việc'
          : null,
        bhxhEmployee: bhxhE,
        bhytEmployee: bhytE,
        bhtnEmployee: bhtnE,
        siEmployeeTotal: bhxhE + bhytE + bhtnE,
        bhxhEmployer: bhxhEr,
        bhytEmployer: bhytEr,
        bhtnEmployer: bhtnEr,
        siEmployerTotal: bhxhEr + bhytEr + bhtnEr,
        unionFee,
        siRateVersionId: siVersion.id,
      }),
    );
  }

  // SI records for other months (simplified - same as Feb for exempt logic)
  for (const [month, year] of batchMonths) {
    if (month === 2 && year === 2026) continue;
    for (const emp of employees) {
      const base = empBaseMap.get(emp.employeeCode) ?? 0;
      const realSiBase = Math.max(base * 0.5, SI_MIN_BASE);
      const isExempt = ['thai_san', 'thu_viec', 'nghi_viec_tv'].includes(
        emp.status,
      );
      let bhxhE = 0,
        bhytE = 0,
        bhtnE = 0,
        bhxhEr = 0,
        bhytEr = 0,
        bhtnEr = 0,
        unionFee = 0;
      if (!isExempt) {
        bhxhE = Math.round(realSiBase * SI_BHXH_RATE);
        bhytE = Math.round(realSiBase * SI_BHYT_RATE);
        bhtnE = Math.round(realSiBase * SI_BHTN_RATE);
        bhxhEr = Math.round(realSiBase * SI_BHXH_EMPLOYER_RATE);
        bhytEr = Math.round(realSiBase * SI_BHYT_EMPLOYER_RATE);
        bhtnEr = Math.round(realSiBase * SI_BHTN_EMPLOYER_RATE);
        unionFee = Math.round(realSiBase * UNION_FEE_RATE);
      }
      await siRecordRepo.save(
        siRecordRepo.create({
          employeeId: emp.id,
          year,
          month,
          siBase: realSiBase,
          isExempt,
          exemptReason: isExempt
            ? emp.status === 'thai_san'
              ? 'Thai sản'
              : 'Thử việc'
            : null,
          bhxhEmployee: bhxhE,
          bhytEmployee: bhytE,
          bhtnEmployee: bhtnE,
          siEmployeeTotal: bhxhE + bhytE + bhtnE,
          bhxhEmployer: bhxhEr,
          bhytEmployer: bhytEr,
          bhtnEmployer: bhtnEr,
          siEmployerTotal: bhxhEr + bhytEr + bhtnEr,
          unionFee,
          siRateVersionId: siVersion.id,
        }),
      );
    }
  }

  // 9. Variable incomes for all batch months
  const viData: Record<
    string,
    {
      commission: number;
      commissionDetail: string;
      bonus: number;
      bonusDetail: string;
      otherIncome: number;
      otherIncomeDetail: string;
      otherAllowance: number;
      otherAllowanceDetail: string;
    }
  > = {
    EMP001: {
      commission: 5e6,
      commissionDetail: 'GT ứng viên Trần Văn B',
      bonus: 2e6,
      bonusDetail: 'Thưởng KPI Q1',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 1e6,
      otherAllowanceDetail: 'Công tác phí',
    },
    EMP002: {
      commission: 0,
      commissionDetail: '',
      bonus: 3e6,
      bonusDetail: 'Thưởng dự án Marketing',
      otherIncome: 500_000,
      otherIncomeDetail: 'Hỗ trợ L&D',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP003: {
      commission: 0,
      commissionDetail: '',
      bonus: 0,
      bonusDetail: '',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 500_000,
      otherAllowanceDetail: 'OT 10h',
    },
    EMP004: {
      commission: 0,
      commissionDetail: '',
      bonus: 1e6,
      bonusDetail: 'Thưởng pass TV',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP005: {
      commission: 0,
      commissionDetail: '',
      bonus: 0,
      bonusDetail: '',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP006: {
      commission: 3e6,
      commissionDetail: 'GT ứng viên Lê C',
      bonus: 0,
      bonusDetail: '',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP007: {
      commission: 0,
      commissionDetail: '',
      bonus: 1.5e6,
      bonusDetail: 'Thưởng thâm niên',
      otherIncome: 1e6,
      otherIncomeDetail: 'Hỗ trợ chứng chỉ CPA',
      otherAllowance: 500_000,
      otherAllowanceDetail: 'Đi lại',
    },
    EMP008: {
      commission: 0,
      commissionDetail: '',
      bonus: 0,
      bonusDetail: '',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP009: {
      commission: 0,
      commissionDetail: '',
      bonus: 500_000,
      bonusDetail: 'Thưởng bài viết',
      otherIncome: 200_000,
      otherIncomeDetail: 'Hỗ trợ L&D',
      otherAllowance: 0,
      otherAllowanceDetail: '',
    },
    EMP010: {
      commission: 10e6,
      commissionDetail: 'GT 2 ứng viên Senior',
      bonus: 5e6,
      bonusDetail: 'Thưởng doanh số Q1',
      otherIncome: 0,
      otherIncomeDetail: '',
      otherAllowance: 2e6,
      otherAllowanceDetail: 'OT + Đi lại',
    },
  };

  for (const [month, year] of batchMonths) {
    const mult = VARIABLE_MULTIPLIERS[month] ?? 1;
    for (const emp of employees) {
      const vi = viData[emp.employeeCode];
      await variableRepo.save(
        variableRepo.create({
          employeeId: emp.id,
          year,
          month,
          commission: Math.round((vi?.commission ?? 0) * mult),
          commissionDetail: vi?.commissionDetail ?? '',
          bonus: Math.round((vi?.bonus ?? 0) * mult),
          bonusDetail: vi?.bonusDetail ?? '',
          otherIncome: Math.round((vi?.otherIncome ?? 0) * mult),
          otherIncomeDetail: vi?.otherIncomeDetail ?? '',
          otherAllowance: Math.round((vi?.otherAllowance ?? 0) * mult),
          otherAllowanceDetail: vi?.otherAllowanceDetail ?? '',
        }),
      );
    }
  }

  // 10. Payroll batches with records

  for (const [month, year] of batchMonths) {
    const std = [10, 12].includes(month) ? 22 : 20;
    const records: Partial<PayrollRecord>[] = [];

    const allTk = await timekeepingRepo.find({ where: { year, month } });
    const allSi = await siRecordRepo.find({ where: { year, month } });
    const allVi = await variableRepo.find({ where: { year, month } });
    const tkMap = new Map(allTk.map((t) => [t.employeeId, t]));
    const siMap = new Map(allSi.map((s) => [s.employeeId, s]));
    const viMap = new Map(allVi.map((v) => [v.employeeId, v]));

    for (const emp of employees) {
      const base = empBaseMap.get(emp.employeeCode) ?? 0;
      const tk = tkMap.get(emp.id);
      const si = siMap.get(emp.id);
      const vi = viMap.get(emp.id);
      if (!tk || !si) continue;
      const pkgLunch = 1_000_000;
      const pkgPhone = 500_000;
      const probPkgPerf = base - pkgLunch;
      const pkgPerf = base - pkgLunch - pkgPhone;

      const probDays = Number(tk.probationDays);
      const offDays = Number(tk.officialDays);
      const leaveDays = Number(tk.remainingLeave);

      const proratedBase =
        prorate(base, std, probDays) +
        prorate(base, std, offDays) +
        prorate(base, std, leaveDays);
      const totalLunch =
        prorate(pkgLunch, std, probDays) +
        prorate(pkgLunch, std, offDays) +
        prorate(pkgLunch, std, leaveDays);
      const totalPhone =
        emp.status === 'thu_viec' || emp.status === 'nghi_viec_tv'
          ? 0
          : pkgPhone;
      const proratedPerf =
        prorate(probPkgPerf, std, probDays) +
        prorate(pkgPerf, std, offDays) +
        prorate(pkgPerf, std, leaveDays);
      const proratedTotal =
        proratedBase + totalLunch + totalPhone + proratedPerf;

      const totalVar = vi
        ? Number(vi.commission) +
          Number(vi.bonus) +
          Number(vi.otherIncome) +
          Number(vi.otherAllowance)
        : 0;
      const grossSalary = proratedTotal + totalVar;

      const taxableIncome = grossSalary - totalLunch - totalPhone;

      const siBase = Number(si.siBase);
      const siEmployee = Number(si.siEmployeeTotal);
      const siEmployer = Number(si.siEmployerTotal);
      const unionFee = Number(si.unionFee);

      const taxMethod = getTaxMethod(emp.status as EmployeeStatus);
      let pit = 0;
      let taxAssessable = 0;
      let personalDed = 0;
      let dependentDed = 0;

      const depCount = empDependentsMap.get(emp.employeeCode) ?? 0;
      if (taxMethod === 'progressive') {
        personalDed = PERSONAL_DEDUCTION;
        dependentDed = depCount * DEPENDENT_DEDUCTION;
        taxAssessable = Math.max(
          0,
          taxableIncome - siEmployee - personalDed - dependentDed,
        );
        pit = calculateProgressiveTax(taxAssessable);
      } else {
        taxAssessable = taxableIncome;
        pit = Math.round(taxableIncome * FLAT_TAX_RATE);
      }

      const totalDeduction = pit + siEmployee;
      const netSalary = grossSalary - totalDeduction;
      const totalEmployerCost = netSalary + siEmployer + unionFee;

      records.push({
        employeeId: emp.id,
        pkgBaseSalary: base,
        pkgLunch,
        pkgPhone,
        pkgPerfBonus: pkgPerf,
        pkgTotal: base + pkgLunch + pkgPhone + pkgPerf,
        probPkgBaseSalary: base,
        probPkgLunch: pkgLunch,
        probPkgPerfBonus: probPkgPerf,
        probPkgTotal: base + pkgLunch + probPkgPerf,
        standardDays: std,
        actualDays: Number(tk.actualDays),
        probationDays: probDays,
        officialDays: offDays,
        remainingLeave: leaveDays,
        unpaidLeaveProbation: Number(tk.unpaidLeaveProbation),
        unpaidLeaveOfficial: Number(tk.unpaidLeaveOfficial),
        proratedBaseSalary: proratedBase,
        proratedPerfBonus: proratedPerf,
        totalLunchActual: totalLunch,
        totalPhoneActual: totalPhone,
        proratedTotal,
        commission: vi ? Number(vi.commission) : 0,
        bonus: vi ? Number(vi.bonus) : 0,
        otherIncome: vi ? Number(vi.otherIncome) : 0,
        otherAllowance: vi ? Number(vi.otherAllowance) : 0,
        totalVariableIncome: totalVar,
        grossSalary,
        nonTaxableLunch: totalLunch,
        nonTaxablePhone: totalPhone,
        taxableIncome,
        siBase,
        siBhxh: Number(si.bhxhEmployee),
        siBhyt: Number(si.bhytEmployee),
        siBhtn: Number(si.bhtnEmployee),
        siEmployeeTotal: siEmployee,
        personalDeduction: personalDed,
        dependentCount: depCount,
        dependentDeduction: dependentDed,
        taxMethod,
        taxAssessableIncome: taxAssessable,
        pit,
        unionFee,
        retroDeduction: 0,
        retroAddition: 0,
        totalDeduction,
        netSalary,
        siEmployerBhxh: Number(si.bhxhEmployer),
        siEmployerBhyt: Number(si.bhytEmployer),
        siEmployerBhtn: Number(si.bhtnEmployer),
        siEmployerTotal: siEmployer,
        employerUnionFee: unionFee,
        totalEmployerCost,
        costAccount: emp.costAccount,
        bankAccount: emp.bankAccount,
        bankName: emp.bankName,
      });
    }

    const batch = await batchRepo.save(
      batchRepo.create({
        year,
        month,
        status: month === 2 && year === 2026 ? 'draft' : 'approved',
        taxBracketVersionId: taxVersion.id,
        siRateVersionId: siVersion.id,
        totalEmployees: records.length,
        totalGross: records.reduce((s, r) => s + Number(r.grossSalary || 0), 0),
        totalNet: records.reduce((s, r) => s + Number(r.netSalary || 0), 0),
        totalPit: records.reduce((s, r) => s + Number(r.pit || 0), 0),
        totalSiEmployee: records.reduce(
          (s, r) => s + Number(r.siEmployeeTotal || 0),
          0,
        ),
        totalEmployerCost: records.reduce(
          (s, r) => s + Number(r.totalEmployerCost || 0),
          0,
        ),
        createdBy: user1.id,
        approvedBy: month === 2 && year === 2026 ? null : user2.id,
        approvedAt:
          month === 2 && year === 2026 ? null : new Date(year, month - 1, 27),
      }),
    );

    for (const r of records) {
      await recordRepo.save(
        recordRepo.create({
          ...r,
          batchId: batch.id,
        } as Partial<PayrollRecord>),
      );
    }
  }

  // 11. Proposals
  const emp001 = empMap.get('EMP001')!;
  const emp004 = empMap.get('EMP004')!;
  const emp007 = empMap.get('EMP007')!;
  const emp009 = empMap.get('EMP009')!;

  await proposalRepo.save([
    proposalRepo.create({
      employeeId: emp001.id,
      type: 'timekeeping',
      year: 2026,
      month: 2,
      subject: 'Thiếu ngày công',
      description:
        'Tháng 2 em đi công tác 2 ngày (10-11/2) nhưng trên bảng công chưa được cập nhật. Em có xác nhận từ trưởng phòng.',
      status: 'pending',
    }),
    proposalRepo.create({
      employeeId: emp009.id,
      type: 'payroll',
      year: 2026,
      month: 1,
      subject: 'Sai khoản thưởng tháng 1',
      description:
        'Thưởng dự án năm mới của em là 800.000đ nhưng trên phiếu lương chỉ ghi 350.000đ. Em gửi kèm email xác nhận từ quản lý.',
      status: 'processing',
      respondedBy: user1.id,
      respondedAt: new Date('2026-02-26T08:00:00Z'),
      response:
        'Em gửi chị email xác nhận từ quản lý nhé, chị sẽ kiểm tra và cập nhật.',
    }),
    proposalRepo.create({
      employeeId: emp004.id,
      type: 'payroll',
      year: 2026,
      month: 2,
      subject: 'Hỏi về mức đóng BHXH',
      description:
        'Em vừa chuyển chính thức từ 10/2, em muốn hỏi mức đóng BHXH của em được tính từ tháng nào?',
      status: 'resolved',
      respondedBy: user1.id,
      respondedAt: new Date('2026-02-20T15:30:00Z'),
      response:
        'Em chuyển chính thức trước ngày 15 nên em sẽ đóng BHXH từ tháng 2 luôn nhé. Chi tiết em xem ở mục BHXH.',
    }),
    proposalRepo.create({
      employeeId: emp007.id,
      type: 'timekeeping',
      year: 2026,
      month: 1,
      subject: 'Nghỉ phép chưa được trừ đúng',
      description:
        'Tháng 1 em nghỉ phép 1 ngày (15/1) nhưng hệ thống vẫn ghi phép dư = 3 ngày, đúng ra phải là 2 ngày.',
      status: 'rejected',
      respondedBy: user1.id,
      respondedAt: new Date('2026-02-11T09:00:00Z'),
      response:
        'Chị kiểm tra lại hệ thống iCheck, phép dư T1 của em đúng là 3 ngày vì phép năm mới đã được cộng vào đầu năm.',
    }),
  ]);

  console.log('Seed completed successfully');
  await dataSource.destroy();
}

runSeed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
