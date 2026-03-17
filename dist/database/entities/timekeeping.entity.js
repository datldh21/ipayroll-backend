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
exports.Timekeeping = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let Timekeeping = class Timekeeping {
    id;
    employeeId;
    employee;
    year;
    month;
    standardDays;
    actualDays;
    probationDays;
    officialDays;
    remainingLeave;
    unpaidLeave;
    unpaidLeaveProbation;
    unpaidLeaveOfficial;
    createdAt;
    updatedAt;
};
exports.Timekeeping = Timekeeping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Timekeeping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], Timekeeping.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Timekeeping.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_days', type: 'int' }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "standardDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "actualDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'probation_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "probationDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'official_days', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "officialDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_leave', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "remainingLeave", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unpaid_leave', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "unpaidLeave", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unpaid_leave_probation', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "unpaidLeaveProbation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unpaid_leave_official', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Timekeeping.prototype, "unpaidLeaveOfficial", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Timekeeping.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Timekeeping.prototype, "updatedAt", void 0);
exports.Timekeeping = Timekeeping = __decorate([
    (0, typeorm_1.Entity)('timekeeping'),
    (0, typeorm_1.Unique)(['employeeId', 'year', 'month']),
    (0, typeorm_1.Index)('idx_timekeeping_period', ['year', 'month', 'employeeId'])
], Timekeeping);
//# sourceMappingURL=timekeeping.entity.js.map