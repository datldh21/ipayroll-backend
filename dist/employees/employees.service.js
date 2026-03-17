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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../database/entities/employee.entity");
const employee_contract_entity_1 = require("../database/entities/employee-contract.entity");
const dependent_entity_1 = require("../database/entities/dependent.entity");
let EmployeesService = class EmployeesService {
    employeeRepo;
    contractRepo;
    dependentRepo;
    constructor(employeeRepo, contractRepo, dependentRepo) {
        this.employeeRepo = employeeRepo;
        this.contractRepo = contractRepo;
        this.dependentRepo = dependentRepo;
    }
    async findAll() {
        const employees = await this.employeeRepo.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { employeeCode: 'ASC' },
        });
        const result = await Promise.all(employees.map(async (emp) => {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const depCount = await this.dependentRepo
                .createQueryBuilder('d')
                .where('d.employee_id = :empId', { empId: emp.id })
                .andWhere('d.registered_from <= :endOfMonth', { endOfMonth })
                .andWhere('(d.registered_to IS NULL OR d.registered_to >= :startOfMonth)', {
                startOfMonth,
            })
                .getCount();
            const contract = await this.contractRepo.findOne({
                where: { employeeId: emp.id },
                order: { effectiveDate: 'DESC' },
            });
            return this.toResponse(emp, Number(contract?.baseSalary ?? 0), depCount);
        }));
        return result;
    }
    toDateString(val) {
        if (val == null)
            return '';
        if (val instanceof Date)
            return val.toISOString().split('T')[0];
        if (typeof val === 'string')
            return val.split('T')[0];
        return '';
    }
    toResponse(emp, baseSalary, dependents) {
        return {
            id: emp.id,
            employeeCode: emp.employeeCode,
            fullName: emp.fullName,
            email: emp.email,
            phone: emp.phone,
            bankAccount: emp.bankAccount,
            bankName: emp.bankName,
            department: emp.department,
            position: emp.position,
            level: emp.level,
            orgLevel1: emp.orgLevel1,
            orgLevel2: emp.orgLevel2,
            orgLevel3: emp.orgLevel3,
            orgLevel4: emp.orgLevel4,
            orgLevel5: emp.orgLevel5,
            status: emp.status,
            onboardDate: this.toDateString(emp.onboardDate),
            officialDate: this.toDateString(emp.officialDate),
            lastWorkingDate: this.toDateString(emp.lastWorkingDate),
            dependents,
            baseSalary: Number(baseSalary),
            costAccount: emp.costAccount,
        };
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_contract_entity_1.EmployeeContract)),
    __param(2, (0, typeorm_1.InjectRepository)(dependent_entity_1.Dependent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map