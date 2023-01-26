import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddLogedinCartDto } from './dto/addLoginedCart-dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addLogedinCart(dto: AddLogedinCartDto[]): Promise<void> {
    await this.prisma.cart.createMany({
      data: dto,
    });
  }
}
