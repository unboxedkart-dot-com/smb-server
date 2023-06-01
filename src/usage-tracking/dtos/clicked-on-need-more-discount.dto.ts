import { IsNotEmpty, IsString } from 'class-validator';

export class clickedOnNeedMoreDiscountDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
}
