import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '../type/item';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

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

  async getItemsByGenreId(id: number, take: number): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        categories: {
          has: id,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
      take: take,
    });
    const genreItems = items.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    return genreItems;
  }

  async preTop(id: number): Promise<{ newItems: Item[]; genreItems: Item[] }> {
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
    const result = await this.prisma.item.findMany({
      where: {
        categories: {
          has: id,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });
    const genreItems = result.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    return { newItems, genreItems };
  }

  async getAllItems(): Promise<Item[]> {
    return await this.prisma.item.findMany();
  }

  async getItemById(id: number): Promise<Item> {
    return await this.prisma.item.findUnique({
      where: {
        itemId: id,
      },
    });
  }
}
