import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class AddProductSpecsDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

//   @IsMap()
  @IsNotEmpty()
  productSpecs: {};
}
