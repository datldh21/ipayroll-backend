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
exports.VariableIncome = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const user_entity_1 = require("./user.entity");
let VariableIncome = class VariableIncome {
    id;
    employeeId;
    employee;
    year;
    month;
    commission;
    commissionDetail;
    bonus;
    bonusDetail;
    otherIncome;
    otherIncomeDetail;
    otherAllowance;
    otherAllowanceDetail;
    updatedBy;
    updatedByUser;
    updatedAt;
};
exports.VariableIncome = VariableIncome;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VariableIncome.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], VariableIncome.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], VariableIncome.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission_detail', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "commissionDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bonus', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bonus_detail', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "bonusDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_income', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "otherIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_income_detail', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "otherIncomeDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_allowance', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], VariableIncome.prototype, "otherAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_allowance_detail', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "otherAllowanceDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", Object)
], VariableIncome.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], VariableIncome.prototype, "updatedAt", void 0);
exports.VariableIncome = VariableIncome = __decorate([
    (0, typeorm_1.Entity)('variable_incomes'),
    (0, typeorm_1.Unique)(['employeeId', 'year', 'month']),
    (0, typeorm_1.Index)('idx_variable_incomes_period', ['year', 'month', 'employeeId'])
], VariableIncome);
//# sourceMappingURL=variable-income.entity.js.map