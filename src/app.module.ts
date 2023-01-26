import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { RentalHistoryModule } from './rentalHistory/rentalHistory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ItemModule,
    UserModule,
    CartModule,
    PaymentModule,
    RentalHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
