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
exports.SiRateVersion = void 0;
const typeorm_1 = require("typeorm");
let SiRateVersion = class SiRateVersion {
    id;
    name;
    effectiveFrom;
    effectiveTo;
    createdAt;
};
exports.SiRateVersion = SiRateVersion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SiRateVersion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SiRateVersion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_from', type: 'date' }),
    __metadata("design:type", Date)
], SiRateVersion.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_to', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], SiRateVersion.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SiRateVersion.prototype, "createdAt", void 0);
exports.SiRateVersion = SiRateVersion = __decorate([
    (0, typeorm_1.Entity)('si_rate_versions')
], SiRateVersion);
//# sourceMappingURL=si-rate-version.entity.js.map