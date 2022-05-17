import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { CreateAppVersionDto } from './dto/create-app-version.dto';

@Controller('app-version')
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Post()
  create(@Body() createAppVersionDto: CreateAppVersionDto) {
    return this.appVersionService.create(createAppVersionDto);
  }

  @Get()
  findAll() {
    return this.appVersionService.findOne();
  }
}
