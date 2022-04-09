import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/product.module';
import { SearchModule } from './search/search.module';
import { OrdersModule } from './orders/orders.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { AddressesModule } from './addresses/addresses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CouponsModule } from './coupons/coupons.module';
import { QAndAModule } from './q-and-a/q-and-a.module';
import { OrderSummaryModule } from './order-summary/order-summary.module';
import { StoreLocationModule } from './store-location/store-location.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    SearchModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
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
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
