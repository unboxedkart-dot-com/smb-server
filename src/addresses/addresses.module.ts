import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { AddressSchema } from 'src/models/address.model';
import { UserSchema } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService, JwtAuthGuard],
})
export class AddressesModule {}
