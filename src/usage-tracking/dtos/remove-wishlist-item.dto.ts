import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RemoveWishlistItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
}
