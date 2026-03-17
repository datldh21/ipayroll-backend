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
exports.ProposalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proposal_entity_1 = require("../database/entities/proposal.entity");
const employee_entity_1 = require("../database/entities/employee.entity");
let ProposalsService = class ProposalsService {
    repo;
    employeeRepo;
    constructor(repo, employeeRepo) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
    }
    async findAll() {
        const list = await this.repo.find({
            relations: ['employee'],
            order: { createdAt: 'DESC' },
        });
        return list.map((p) => ({
            id: p.id,
            employeeId: p.employeeId,
            employeeName: p.employee?.fullName ?? '',
            department: p.employee?.department ?? '',
            type: p.type,
            month: p.month,
            year: p.year,
            subject: p.subject,
            description: p.description,
            status: p.status,
            createdAt: p.createdAt.toISOString(),
            response: p.response ?? undefined,
            respondedBy: p.respondedBy?.toString() ?? undefined,
            respondedAt: p.respondedAt?.toISOString() ?? undefined,
        }));
    }
    async create(dto) {
        const proposal = this.repo.create({
            ...dto,
            status: 'pending',
        });
        const saved = await this.repo.save(proposal);
        const withEmp = await this.repo.findOne({
            where: { id: saved.id },
            relations: ['employee'],
        });
        return {
            id: withEmp.id,
            employeeId: withEmp.employeeId,
            employeeName: withEmp.employee?.fullName ?? '',
            department: withEmp.employee?.department ?? '',
            type: withEmp.type,
            month: withEmp.month,
            year: withEmp.year,
            subject: withEmp.subject,
            description: withEmp.description,
            status: withEmp.status,
            createdAt: withEmp.createdAt.toISOString(),
        };
    }
    async respond(id, status, response, respondedBy) {
        await this.repo.update(id, {
            status,
            response,
            respondedBy,
            respondedAt: new Date(),
        });
        return this.repo.findOne({ where: { id }, relations: ['employee'] });
    }
};
exports.ProposalsService = ProposalsService;
exports.ProposalsService = ProposalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProposalsService);
//# sourceMappingURL=proposals.service.js.map