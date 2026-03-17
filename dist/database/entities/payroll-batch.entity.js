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
exports.PayrollBatch = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const tax_bracket_version_entity_1 = require("./tax-bracket-version.entity");
const si_rate_version_entity_1 = require("./si-rate-version.entity");
const payroll_record_entity_1 = require("./payroll-record.entity");
let PayrollBatch = class PayrollBatch {
    id;
    year;
    month;
    status;
    taxBracketVersionId;
    taxBracketVersion;
    siRateVersionId;
    siRateVersion;
    totalEmployees;
    totalGross;
    totalNet;
    totalPit;
    totalSiEmployee;
    totalEmployerCost;
    createdBy;
    createdByUser;
    createdAt;
    submittedAt;
    approvedBy;
    approvedByUser;
    approvedAt;
    paidAt;
    records;
};
exports.PayrollBatch = PayrollBatch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollBatch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, default: 'draft' }),
    __metadata("design:type", String)
], PayrollBatch.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_bracket_version_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "taxBracketVersionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tax_bracket_version_entity_1.TaxBracketVersion, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tax_bracket_version_id' }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "taxBracketVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_rate_version_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "siRateVersionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => si_rate_version_entity_1.SiRateVersion, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'si_rate_version_id' }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "siRateVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_employees', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_gross', type: 'decimal', precision: 18, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalGross", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_net', type: 'decimal', precision: 18, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalNet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_pit', type: 'decimal', precision: 18, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalPit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_si_employee', type: 'decimal', precision: 18, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalSiEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_employer_cost', type: 'decimal', precision: 18, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], PayrollBatch.prototype, "totalEmployerCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollBatch.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], PayrollBatch.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PayrollBatch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approved_by' }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "approvedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatch.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_record_entity_1.PayrollRecord, (record) => record.batch),
    __metadata("design:type", Array)
], PayrollBatch.prototype, "records", void 0);
exports.PayrollBatch = PayrollBatch = __decorate([
    (0, typeorm_1.Entity)('payroll_batches'),
    (0, typeorm_1.Unique)(['year', 'month']),
    (0, typeorm_1.Index)('idx_payroll_batches_period', ['year', 'month']),
    (0, typeorm_1.Index)('idx_payroll_batches_status', ['status'])
], PayrollBatch);
//# sourceMappingURL=payroll-batch.entity.js.map