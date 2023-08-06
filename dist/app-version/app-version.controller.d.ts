import { AppVersionService } from './app-version.service';
import { CreateAppVersionDto } from './dto/create-app-version.dto';
export declare class AppVersionController {
    private readonly appVersionService;
    constructor(appVersionService: AppVersionService);
    create(createAppVersionDto: CreateAppVersionDto): Promise<void>;
    findAll(): Promise<any>;
}
