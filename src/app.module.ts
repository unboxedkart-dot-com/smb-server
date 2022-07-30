import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CouponsModule } from './coupons/coupons.module';
import { FaqsModule } from './faqs/faqs.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MailModule } from './mail/mail.module';
import { OrderSummaryModule } from './order-summary/order-summary.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/product.module';
import { QAndAModule } from './q-and-a/q-and-a.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SearchModule } from './search/search.module';
import { StoreLocationModule } from './store-location/store-location.module';
import { UserModule } from './user/user.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { VariantsModule } from './variants/variants.module';
import { S3Module } from './s3/s3.module';
import { CarouselItemsModule } from './carousel-items/carousel-items.module';
import { AppVersionModule } from './app-version/app-version.module';
import { ServicesModule } from './services/services.module';
import { ServiceModule } from './service/service.module';
import { LocalInventoryModule } from './local-inventory/local-inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    SearchModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
    MongooseModule.forRoot(process.env.SERVICE_DB_CONNECTION_URL, {
      connectionName: 'serviceDb',
    }),
    // MongooseModule.forRoot(process.env.ADMIN_DB_CONNECTION_URL, {
    //   connectionName: 'adminDb',
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://sunil:85cJEI8mAAEjMobR@cluster0.eg9rg.mongodb.net/?retryWrites=true&w=majority',
      {
        connectionName: 'inventoryDb',
      },
    ),

    OrdersModule,
    FavoritesModule,
    CartModule,
    AddressesModule,
    ReviewsModule,
    QAndAModule,
    CouponsModule,
    OrderSummaryModule,
    StoreLocationModule,
    MailModule,
    UserModule,
    FaqsModule,
    ProductDetailsModule,
    VariantsModule,
    S3Module,
    CarouselItemsModule,
    AppVersionModule,
    ServicesModule,
    ServiceModule,
    LocalInventoryModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
