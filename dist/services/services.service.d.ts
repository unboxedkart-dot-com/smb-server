/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { ServiceModel } from 'src/models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Model } from 'mongoose';
export declare class ServicesService {
    private readonly serviceModel;
    constructor(serviceModel: Model<ServiceModel>);
    findOne(productCode: string, color: string): Promise<(import("mongoose").Document<unknown, any, ServiceModel> & ServiceModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(createServiceDto: CreateServiceDto): string;
    findAll(): string;
    update(id: number, updateServiceDto: UpdateServiceDto): string;
    remove(id: number): string;
    addAll(): Promise<void>;
}
