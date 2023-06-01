import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RemoveCartItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
}
