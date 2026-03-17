"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableIncomesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const variable_incomes_controller_1 = require("./variable-incomes.controller");
const variable_incomes_service_1 = require("./variable-incomes.service");
const variable_income_entity_1 = require("../database/entities/variable-income.entity");
let VariableIncomesModule = class VariableIncomesModule {
};
exports.VariableIncomesModule = VariableIncomesModule;
exports.VariableIncomesModule = VariableIncomesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([variable_income_entity_1.VariableIncome])],
        controllers: [variable_incomes_controller_1.VariableIncomesController],
        providers: [variable_incomes_service_1.VariableIncomesService],
        exports: [variable_incomes_service_1.VariableIncomesService],
    })
], VariableIncomesModule);
//# sourceMappingURL=variable-incomes.module.js.map