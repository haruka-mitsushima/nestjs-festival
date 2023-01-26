import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
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

  @Patch('updateRentalHistory/:id')
  async updateRentalHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { rentalStart: Date; rentalEnd: Date },
  ) {
    await this.rentalHistory.updateRentalHistory(id, data);
  }
}
