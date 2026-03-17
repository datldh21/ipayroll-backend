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
exports.Proposal = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const user_entity_1 = require("./user.entity");
let Proposal = class Proposal {
    id;
    employeeId;
    employee;
    type;
    year;
    month;
    subject;
    description;
    status;
    createdAt;
    response;
    respondedBy;
    respondedByUser;
    respondedAt;
};
exports.Proposal = Proposal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Proposal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], Proposal.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Proposal.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Proposal.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], Proposal.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], Proposal.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject', type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Proposal.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, default: 'pending' }),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Proposal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "respondedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'responded_by' }),
    __metadata("design:type", Object)
], Proposal.prototype, "respondedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responded_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "respondedAt", void 0);
exports.Proposal = Proposal = __decorate([
    (0, typeorm_1.Entity)('proposals'),
    (0, typeorm_1.Index)('idx_proposals_employee', ['employeeId', 'year', 'month'])
], Proposal);
//# sourceMappingURL=proposal.entity.js.map