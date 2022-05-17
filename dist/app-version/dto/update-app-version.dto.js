"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppVersionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_app_version_dto_1 = require("./create-app-version.dto");
class UpdateAppVersionDto extends (0, mapped_types_1.PartialType)(create_app_version_dto_1.CreateAppVersionDto) {
}
exports.UpdateAppVersionDto = UpdateAppVersionDto;
//# sourceMappingURL=update-app-version.dto.js.map