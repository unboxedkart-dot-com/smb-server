/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { AppVersion } from 'src/models/app_version.model';
import { CreateAppVersionDto } from './dto/create-app-version.dto';
export declare class AppVersionService {
    private readonly appVersionModel;
    constructor(appVersionModel: Model<AppVersion>);
    create(createAppVersionDto: CreateAppVersionDto): Promise<void>;
    findOne(): Promise<import("mongoose").Document<unknown, any, AppVersion> & AppVersion & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
