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
exports.Dependent = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let Dependent = class Dependent {
    id;
    employeeId;
    employee;
    fullName;
    relationship;
    taxId;
    registeredFrom;
    registeredTo;
};
exports.Dependent = Dependent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Dependent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], Dependent.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Dependent.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Dependent.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'relationship', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Dependent.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Dependent.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registered_from', type: 'date' }),
    __metadata("design:type", Date)
], Dependent.prototype, "registeredFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registered_to', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Dependent.prototype, "registeredTo", void 0);
exports.Dependent = Dependent = __decorate([
    (0, typeorm_1.Entity)('dependents')
], Dependent);
//# sourceMappingURL=dependent.entity.js.map