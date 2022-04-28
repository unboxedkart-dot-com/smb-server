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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    SearchModule,
    AuthModule,
    MongooseModule.forRoot(
      process.env.DB_CONNECTION_URL
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
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
