import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppVersion } from 'src/models/app_version.model';
import { CreateAppVersionDto } from './dto/create-app-version.dto';

@Injectable()
export class AppVersionService {
  constructor(
    @InjectModel('AppVersion')
    private readonly appVersionModel: Model<AppVersion>,
  ) {}

  async create(createAppVersionDto: CreateAppVersionDto) {
    const newAppVersion = new this.appVersionModel({
      description: createAppVersionDto.description,
      version: createAppVersionDto.version,
      publishDate: createAppVersionDto.publishDate,
      minAppVersion: createAppVersionDto.minAppVersion,
    });
    newAppVersion.save();
  }

  async findOne() {
    const latestVersion = await this.appVersionModel
      .findOne()
      .sort({ timestamp: -1 });
    return latestVersion;
  }
}
