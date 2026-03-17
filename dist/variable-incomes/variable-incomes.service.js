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
exports.VariableIncomesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const variable_income_entity_1 = require("../database/entities/variable-income.entity");
let VariableIncomesService = class VariableIncomesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByPeriod(year, month) {
        const list = await this.repo.find({
            where: { year, month },
            relations: ['employee'],
            order: { employeeId: 'ASC' },
        });
        return list.map((v) => ({
            id: v.id,
            employeeId: v.employee?.employeeCode ?? v.employeeId,
            month: v.month,
            year: v.year,
            commission: Number(v.commission),
            commissionDetail: v.commissionDetail ?? '',
            bonus: Number(v.bonus),
            bonusDetail: v.bonusDetail ?? '',
            otherIncome: Number(v.otherIncome),
            otherIncomeDetail: v.otherIncomeDetail ?? '',
            otherAllowance: Number(v.otherAllowance),
            otherAllowanceDetail: v.otherAllowanceDetail ?? '',
        }));
    }
    async update(id, dto) {
        if (Object.keys(dto).length > 0) {
            await this.repo.update(id, dto);
        }
        return this.repo.findOne({ where: { id } });
    }
};
exports.VariableIncomesService = VariableIncomesService;
exports.VariableIncomesService = VariableIncomesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(variable_income_entity_1.VariableIncome)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VariableIncomesService);
//# sourceMappingURL=variable-incomes.service.js.map