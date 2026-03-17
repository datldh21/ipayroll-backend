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
exports.TimekeepingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const timekeeping_entity_1 = require("../database/entities/timekeeping.entity");
let TimekeepingService = class TimekeepingService {
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
        return list.map((t) => ({
            id: t.id,
            employeeId: t.employee?.employeeCode ?? t.employeeId,
            month: t.month,
            year: t.year,
            standardDays: t.standardDays,
            actualDays: Number(t.actualDays),
            probationDays: Number(t.probationDays),
            officialDays: Number(t.officialDays),
            remainingLeave: Number(t.remainingLeave),
            unpaidLeave: Number(t.unpaidLeave),
            unpaidLeaveProbation: Number(t.unpaidLeaveProbation),
            unpaidLeaveOfficial: Number(t.unpaidLeaveOfficial),
        }));
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.repo.findOne({ where: { id } });
    }
};
exports.TimekeepingService = TimekeepingService;
exports.TimekeepingService = TimekeepingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timekeeping_entity_1.Timekeeping)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimekeepingService);
//# sourceMappingURL=timekeeping.service.js.map