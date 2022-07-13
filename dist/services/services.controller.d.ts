/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    addAll(): Promise<void>;
    findOne(productCode: string, color: string): Promise<(import("mongoose").Document<unknown, any, import("../models/service.model").ServiceModel> & import("../models/service.model").ServiceModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateServiceDto: UpdateServiceDto): string;
    remove(id: string): string;
    create(createServiceDto: CreateServiceDto): string;
    findAll(): string;
}
