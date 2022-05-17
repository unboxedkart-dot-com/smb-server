"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarouselItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carousel_item_dto_1 = require("./create-carousel-item.dto");
class UpdateCarouselItemDto extends (0, mapped_types_1.PartialType)(create_carousel_item_dto_1.CreateCarouselItemDto) {
}
exports.UpdateCarouselItemDto = UpdateCarouselItemDto;
//# sourceMappingURL=update-carousel-item.dto.js.map