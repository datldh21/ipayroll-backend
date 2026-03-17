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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
let Employee = class Employee {
    id;
    employeeCode;
    fullName;
    email;
    phone;
    bankAccount;
    bankName;
    department;
    position;
    level;
    orgLevel1;
    orgLevel2;
    orgLevel3;
    orgLevel4;
    orgLevel5;
    status;
    onboardDate;
    officialDate;
    lastWorkingDate;
    costAccount;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_code', type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "employeeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Employee.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 200, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'position', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'level',
        type: 'varchar',
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Employee.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'org_level_1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "orgLevel1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'org_level_2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "orgLevel2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'org_level_3', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "orgLevel3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'org_level_4', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "orgLevel4", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'org_level_5', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "orgLevel5", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Employee.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'onboard_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "onboardDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'official_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "officialDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_working_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "lastWorkingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_account', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "costAccount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Object)
], Employee.prototype, "deletedAt", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees'),
    (0, typeorm_1.Index)('idx_employees_status', ['status'], { where: 'deleted_at IS NULL' })
], Employee);
//# sourceMappingURL=employee.entity.js.map