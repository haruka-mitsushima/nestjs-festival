import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddLogedinCartDto } from './dto/addLoginedCart-dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addLogedinCart(sessionCart: AddLogedinCartDto[]): Promise<void> {
    await this.prisma.cart.createMany({
      data: sessionCart,
    });
  }

  async deleteCart(cartId: number): Promise<void> {
    await this.prisma.cart.delete({
      where: {
        cartId: cartId,
      },
    });
  }
}
