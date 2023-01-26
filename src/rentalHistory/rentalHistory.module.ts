import { Module } from '@nestjs/common';
import { RentalHistoryService } from './rentalHistory.service';
import { RentalHistoryController } from './rentalHistory.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RentalHistoryService],
  controllers: [RentalHistoryController],
})
export class RentalHistoryModule {}
