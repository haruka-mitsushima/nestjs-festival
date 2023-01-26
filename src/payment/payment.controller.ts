import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AddRentalHistoryDto } from './dto/addRentalHistory-dto';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('addRentalHistory/:id')
  async addRentalHistory(
    @Body('addItem') addItem: AddRentalHistoryDto[],
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.paymentService.addRentalHistory(addItem, Number(id));
  }
}
