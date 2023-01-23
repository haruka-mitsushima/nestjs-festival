import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '../type/item';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) { }

  async getNewItems(): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });
    const newItems = items.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    return newItems;
  }

  async getItemsByGenreId(id: number): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        categories: {
          has: id,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
    });
    const genreItems = items.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    return genreItems;
  }
}
