import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddLogedinCartDto } from './dto/addLoginedCart-dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('addCart/:userId/:itemId/:period')
  async addCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Param('period', ParseIntPipe) period: number,
  ): Promise<{ isAdd: boolean }> {
    return await this.cartService.addCart(userId, itemId, period);
  }

  @Post('addLogedinCart')
  async addLogedinCart(
    @Body('sessionCart') sessionCart: AddLogedinCartDto[],
  ): Promise<void> {
    await this.cartService.addLogedinCart(sessionCart);
  }

  @Get('deleteCart/:id')
  async deleteCart(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cartService.deleteCart(id);
  }
}
