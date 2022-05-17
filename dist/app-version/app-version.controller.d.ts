/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AppVersionService } from './app-version.service';
import { CreateAppVersionDto } from './dto/create-app-version.dto';
export declare class AppVersionController {
    private readonly appVersionService;
    constructor(appVersionService: AppVersionService);
    create(createAppVersionDto: CreateAppVersionDto): Promise<void>;
    findAll(): Promise<import("mongoose").Document<unknown, any, import("../models/app_version.model").AppVersion> & import("../models/app_version.model").AppVersion & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
