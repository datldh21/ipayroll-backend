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
exports.EmployeeContract = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let EmployeeContract = class EmployeeContract {
    id;
    employeeId;
    employee;
    contractType;
    baseSalary;
    lunchAllowance;
    phoneAllowance;
    effectiveDate;
    endDate;
    createdAt;
};
exports.EmployeeContract = EmployeeContract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeContract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeContract.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeContract.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_type', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], EmployeeContract.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_salary', type: 'decimal', precision: 15, scale: 0 }),
    __metadata("design:type", Number)
], EmployeeContract.prototype, "baseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'lunch_allowance',
        type: 'decimal',
        precision: 15,
        scale: 0,
        default: 1000000,
    }),
    __metadata("design:type", Number)
], EmployeeContract.prototype, "lunchAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_allowance',
        type: 'decimal',
        precision: 15,
        scale: 0,
        default: 500000,
    }),
    __metadata("design:type", Number)
], EmployeeContract.prototype, "phoneAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_date', type: 'date' }),
    __metadata("design:type", Date)
], EmployeeContract.prototype, "effectiveDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], EmployeeContract.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EmployeeContract.prototype, "createdAt", void 0);
exports.EmployeeContract = EmployeeContract = __decorate([
    (0, typeorm_1.Entity)('employee_contracts'),
    (0, typeorm_1.Index)('idx_employee_contracts_lookup', [
        'employeeId',
        'contractType',
        'effectiveDate',
    ])
], EmployeeContract);
//# sourceMappingURL=employee-contract.entity.js.map