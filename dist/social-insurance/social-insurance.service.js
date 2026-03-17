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
exports.SocialInsuranceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const si_monthly_record_entity_1 = require("../database/entities/si-monthly-record.entity");
let SocialInsuranceService = class SocialInsuranceService {
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
        return list.map((s) => ({
            id: s.id,
            employeeId: s.employee?.employeeCode ?? s.employeeId,
            month: s.month,
            year: s.year,
            baseSI: Number(s.siBase),
            bhxh: Number(s.bhxhEmployee),
            bhyt: Number(s.bhytEmployee),
            bhtn: Number(s.bhtnEmployee),
            siEmployee: Number(s.siEmployeeTotal),
            bhxhEmployer: Number(s.bhxhEmployer),
            bhytEmployer: Number(s.bhytEmployer),
            bhtnEmployer: Number(s.bhtnEmployer),
            siEmployer: Number(s.siEmployerTotal),
            unionFee: Number(s.unionFee),
            isExempt: s.isExempt,
            note: s.exemptReason ?? '',
        }));
    }
    async update(id, dto) {
        const mapped = {};
        const v = (key, val) => { if (val != null)
            mapped[key] = val; };
        v('siBase', dto.siBase ?? dto.baseSI);
        v('bhxhEmployee', dto.bhxhEmployee ?? dto.bhxh);
        v('bhytEmployee', dto.bhytEmployee ?? dto.bhyt);
        v('bhtnEmployee', dto.bhtnEmployee ?? dto.bhtn);
        v('bhxhEmployer', dto.bhxhEmployer);
        v('bhytEmployer', dto.bhytEmployer);
        v('bhtnEmployer', dto.bhtnEmployer);
        v('unionFee', dto.unionFee);
        v('isExempt', dto.isExempt);
        v('exemptReason', dto.exemptReason ?? dto.note);
        if (Object.keys(mapped).length > 0) {
            await this.repo.update(id, mapped);
        }
        return this.repo.findOne({ where: { id } });
    }
};
exports.SocialInsuranceService = SocialInsuranceService;
exports.SocialInsuranceService = SocialInsuranceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(si_monthly_record_entity_1.SiMonthlyRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocialInsuranceService);
//# sourceMappingURL=social-insurance.service.js.map