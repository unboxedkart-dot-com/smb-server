"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStoreTokenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_store_token_dto_1 = require("./create-store-token.dto");
class UpdateStoreTokenDto extends (0, mapped_types_1.PartialType)(create_store_token_dto_1.CreateStoreTokenDto) {
}
exports.UpdateStoreTokenDto = UpdateStoreTokenDto;
//# sourceMappingURL=update-store-token.dto.js.map