import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
//DB_CONNECTION_URL = mongodb+srv://imsunil9:nwz5o2dZnBN3iFzK@unboxedkart.wlupx3j.mongodb.net/?retryWrites=true&w=majority