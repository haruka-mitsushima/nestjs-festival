import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RentalHistory } from '@prisma/client';
import { RentalHistoryService } from './rentalHistory.service';

@Controller('api/rentalHistory')
export class RentalHistoryController {
  constructor(private readonly rentalHistory: RentalHistoryService) {}

  @Get('selectRentalHistory/:userId')
  async selectRentalHistory(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<{ rental: RentalHistory[] }> {
    return await this.rentalHistory.selectRentalHistory(userId);
  }
}
