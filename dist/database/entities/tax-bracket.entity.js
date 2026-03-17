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
exports.TaxBracket = void 0;
const typeorm_1 = require("typeorm");
const tax_bracket_version_entity_1 = require("./tax-bracket-version.entity");
let TaxBracket = class TaxBracket {
    id;
    versionId;
    version;
    bracketOrder;
    incomeFrom;
    incomeTo;
    rate;
};
exports.TaxBracket = TaxBracket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TaxBracket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version_id', type: 'uuid' }),
    __metadata("design:type", String)
], TaxBracket.prototype, "versionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tax_bracket_version_entity_1.TaxBracketVersion),
    (0, typeorm_1.JoinColumn)({ name: 'version_id' }),
    __metadata("design:type", tax_bracket_version_entity_1.TaxBracketVersion)
], TaxBracket.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bracket_order', type: 'int' }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "bracketOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'income_from', type: 'decimal', precision: 15, scale: 0 }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "incomeFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'income_to', type: 'decimal', precision: 15, scale: 0, nullable: true }),
    __metadata("design:type", Object)
], TaxBracket.prototype, "incomeTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate', type: 'decimal', precision: 5, scale: 4 }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "rate", void 0);
exports.TaxBracket = TaxBracket = __decorate([
    (0, typeorm_1.Entity)('tax_brackets'),
    (0, typeorm_1.Unique)(['versionId', 'bracketOrder']),
    (0, typeorm_1.Index)('idx_tax_brackets_version', ['versionId', 'bracketOrder'])
], TaxBracket);
//# sourceMappingURL=tax-bracket.entity.js.map