import { AuthService } from 'src/auth/auth.service';
import { S3Service } from 'src/s3/s3.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { StoreTokenService } from './store-token.service';
export declare class StoreTokenController {
    private readonly storeTokenService;
    private readonly authService;
    private readonly s3Service;
    constructor(storeTokenService: StoreTokenService, authService: AuthService, s3Service: S3Service);
    handleGetAllOrders(request: any, status: string): Promise<void>;
    handleCreateToken(request: any, entireBody: CreateTokenDto): Promise<string>;
}
