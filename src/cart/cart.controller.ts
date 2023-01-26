import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddLogedinCartDto } from './dto/addLoginedCart-dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addLogedinCart')
  async addLogedinCart(@Body() dto: AddLogedinCartDto[]): Promise<void> {
    await this.cartService.addLogedinCart(dto);
  }
}
