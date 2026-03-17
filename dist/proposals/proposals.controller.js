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
exports.ProposalsController = void 0;
const common_1 = require("@nestjs/common");
const proposals_service_1 = require("./proposals.service");
const class_validator_1 = require("class-validator");
class CreateProposalDto {
    employeeId;
    type;
    month;
    year;
    subject;
    description;
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['timekeeping', 'payroll']),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], CreateProposalDto.prototype, "month", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2020),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], CreateProposalDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "description", void 0);
class RespondProposalDto {
    status;
    response;
    respondedBy;
}
__decorate([
    (0, class_validator_1.IsIn)(['pending', 'processing', 'resolved', 'rejected']),
    __metadata("design:type", String)
], RespondProposalDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RespondProposalDto.prototype, "response", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RespondProposalDto.prototype, "respondedBy", void 0);
let ProposalsController = class ProposalsController {
    proposalsService;
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }
    findAll() {
        return this.proposalsService.findAll();
    }
    create(dto) {
        return this.proposalsService.create(dto);
    }
    respond(id, dto) {
        return this.proposalsService.respond(id, dto.status, dto.response, dto.respondedBy);
    }
};
exports.ProposalsController = ProposalsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/respond'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RespondProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "respond", null);
exports.ProposalsController = ProposalsController = __decorate([
    (0, common_1.Controller)('proposals'),
    __metadata("design:paramtypes", [proposals_service_1.ProposalsService])
], ProposalsController);
//# sourceMappingURL=proposals.controller.js.map