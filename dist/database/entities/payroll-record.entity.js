"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRecord = void 0;
const typeorm_1 = require("typeorm");
const payroll_batch_entity_1 = require("./payroll-batch.entity");
const employee_entity_1 = require("./employee.entity");
let PayrollRecord = class PayrollRecord {
    id;
    batchId;
    batch;
    employeeId;
    employee;
    pkgBaseSalary;
    pkgLunch;
    pkgPhone;
    pkgPerfBonus;
    pkgTotal;
    probPkgBaseSalary;
    probPkgLunch;
    probPkgPerfBonus;
    probPkgTotal;
    standardDays;
    actualDays;
    probationDays;
    officialDays;
    unpaidLeaveProbation;
    unpaidLeaveOfficial;
    remainingLeave;
    proratedBaseSalary;
    proratedPerfBonus;
    totalLunchActual;
    totalPhoneActual;
    proratedTotal;
    commission;
    bonus;
    otherIncome;
    otherAllowance;
    totalVariableIncome;
    grossSalary;
    nonTaxableLunch;
    nonTaxablePhone;
    taxableIncome;
    siBase;
    siBhxh;
    siBhyt;
    siBhtn;
    siEmployeeTotal;
    personalDeduction;
    dependentCount;
    dependentDeduction;
    taxMethod;
    taxAssessableIncome;
    pit;
    unionFee;
    retroDeduction;
    retroAddition;
    totalDeduction;
    netSalary;
    siEmployerBhxh;
    siEmployerBhyt;
    siEmployerBhtn;
    siEmployerTotal;
    employerUnionFee;
    totalEmployerCost;
    costAccount;
    bankAccount;
    bankName;
    isManuallyAdjusted;
    notes;
};
exports.PayrollRecord = PayrollRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollRecord.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_batch_entity_1.PayrollBatch, (batch) => batch.records),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", payroll_batch_entity_1.PayrollBatch)
], PayrollRecord.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollRecord.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], PayrollRecord.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pkg_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pkgBaseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pkg_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pkgLunch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pkg_phone', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pkgPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pkg_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pkgPerfBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pkg_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pkgTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prob_pkg_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "probPkgBaseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prob_pkg_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "probPkgLunch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prob_pkg_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "probPkgPerfBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prob_pkg_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "probPkgTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_days', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "standardDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "actualDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'probation_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "probationDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'official_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "officialDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unpaid_leave_probation', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "unpaidLeaveProbation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unpaid_leave_official', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "unpaidLeaveOfficial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_leave', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "remainingLeave", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prorated_base_salary', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "proratedBaseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prorated_perf_bonus', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "proratedPerfBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_lunch_actual', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "totalLunchActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_phone_actual', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "totalPhoneActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prorated_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "proratedTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bonus', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_income', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "otherIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_allowance', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "otherAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_variable_income', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "totalVariableIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gross_salary', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'non_taxable_lunch', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "nonTaxableLunch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'non_taxable_phone', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "nonTaxablePhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'taxable_income', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "taxableIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_base', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siBase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_bhxh', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siBhxh", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_bhyt', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siBhyt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_bhtn', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siBhtn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employee_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siEmployeeTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'personal_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "personalDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dependent_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "dependentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dependent_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "dependentDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_method', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], PayrollRecord.prototype, "taxMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_assessable_income', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "taxAssessableIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pit', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "pit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "unionFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'retro_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "retroDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'retro_addition', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "retroAddition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_deduction', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "totalDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_salary', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "netSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employer_bhxh', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siEmployerBhxh", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employer_bhyt', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siEmployerBhyt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employer_bhtn', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siEmployerBhtn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employer_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "siEmployerTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employer_union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "employerUnionFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_employer_cost', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollRecord.prototype, "totalEmployerCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_account', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], PayrollRecord.prototype, "costAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], PayrollRecord.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], PayrollRecord.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_manually_adjusted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], PayrollRecord.prototype, "isManuallyAdjusted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecord.prototype, "notes", void 0);
exports.PayrollRecord = PayrollRecord = __decorate([
    (0, typeorm_1.Entity)('payroll_records'),
    (0, typeorm_1.Unique)(['batchId', 'employeeId']),
    (0, typeorm_1.Index)('idx_payroll_records_batch', ['batchId']),
    (0, typeorm_1.Index)('idx_payroll_records_employee', ['employeeId'])
], PayrollRecord);
//# sourceMappingURL=payroll-record.entity.js.map