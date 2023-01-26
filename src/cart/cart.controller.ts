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
