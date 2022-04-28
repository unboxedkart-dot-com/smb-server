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
exports.AddProductSpecsDto = void 0;
const IsNotEmpty_1 = require("class-validator/types/decorator/common/IsNotEmpty");
const IsString_1 = require("class-validator/types/decorator/typechecker/IsString");
class AddProductSpecsDto {
}
__decorate([
    (0, IsString_1.IsString)(),
    (0, IsNotEmpty_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductSpecsDto.prototype, "productCode", void 0);
__decorate([
    (0, IsNotEmpty_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], AddProductSpecsDto.prototype, "productSpecs", void 0);
exports.AddProductSpecsDto = AddProductSpecsDto;
//# sourceMappingURL=add-product-specs.dto.js.map