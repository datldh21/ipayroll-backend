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
exports.SiMonthlyRecord = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const si_rate_version_entity_1 = require("./si-rate-version.entity");
let SiMonthlyRecord = class SiMonthlyRecord {
    id;
    employeeId;
    employee;
    year;
    month;
    siBase;
    isExempt;
    exemptReason;
    bhxhEmployee;
    bhytEmployee;
    bhtnEmployee;
    siEmployeeTotal;
    bhxhEmployer;
    bhytEmployer;
    bhtnEmployer;
    siEmployerTotal;
    unionFee;
    siRateVersionId;
    siRateVersion;
};
exports.SiMonthlyRecord = SiMonthlyRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SiMonthlyRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], SiMonthlyRecord.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], SiMonthlyRecord.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_base', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "siBase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_exempt', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SiMonthlyRecord.prototype, "isExempt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exempt_reason', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], SiMonthlyRecord.prototype, "exemptReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhxh_employee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhxhEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhyt_employee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhytEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhtn_employee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhtnEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employee_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "siEmployeeTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhxh_employer', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhxhEmployer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhyt_employer', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhytEmployer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bhtn_employer', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "bhtnEmployer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_employer_total', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "siEmployerTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'union_fee', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], SiMonthlyRecord.prototype, "unionFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_rate_version_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SiMonthlyRecord.prototype, "siRateVersionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => si_rate_version_entity_1.SiRateVersion, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'si_rate_version_id' }),
    __metadata("design:type", Object)
], SiMonthlyRecord.prototype, "siRateVersion", void 0);
exports.SiMonthlyRecord = SiMonthlyRecord = __decorate([
    (0, typeorm_1.Entity)('si_monthly_records'),
    (0, typeorm_1.Unique)(['employeeId', 'year', 'month']),
    (0, typeorm_1.Index)('idx_si_monthly_period', ['year', 'month', 'employeeId'])
], SiMonthlyRecord);
//# sourceMappingURL=si-monthly-record.entity.js.map