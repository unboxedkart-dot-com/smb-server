import { AuthService } from 'src/auth/auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { StoreTokenService } from './store-token.service';
export declare class StoreTokenController {
    private readonly storeTokenService;
    private readonly authService;
    constructor(storeTokenService: StoreTokenService, authService: AuthService);
    handleGetAllOrders(request: any, status: string): Promise<void>;
    handleCreateToken(request: any, entireBody: CreateTokenDto): Promise<string>;
}
