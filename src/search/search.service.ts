import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDto } from './dto/search-dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async search(dto: SearchDto): Promise<{ items: Item[]; count: number }> {
    let response;
    const skip = (dto.page - 1) * dto.take;
    let items;
    let count;
    if (dto.keyword.length === 0) {
      response = await this.prisma.item.findMany({
        where: {
          categories: {
            has: dto.genre,
          },
        },
        orderBy: {
          [dto.orderBy]: dto.order,
        },
        skip: skip,
        take: dto.take,
      });
    } else if (dto.genre === 0) {
      response = await this.prisma.item.findMany({
        where: {
          OR: [
            {
              keywords: {
                has: dto.keyword,
              },
            },
            {
              artist: {
                contains: dto.keyword,
              },
            },
            {
              fesName: {
                contains: dto.keyword,
              },
            },
          ],
        },
        orderBy: {
          [dto.orderBy]: dto.order,
        },
        skip: skip,
        take: dto.take,
      });
    } else {
      response = await this.prisma.item.findMany({
        where: {
          OR: [
            {
              keywords: {
                has: dto.keyword,
              },
            },
            {
              artist: {
                contains: dto.keyword,
              },
            },
            {
              fesName: {
                contains: dto.keyword,
              },
            },
          ],
          categories: {
            has: dto.genre,
          },
        },
        orderBy: {
          [dto.orderBy]: dto.order,
        },
        skip: skip,
        take: dto.take,
      });
    }

    if (dto.keyword.length === 0) {
      count = await this.prisma.item.count({
        where: {
          categories: {
            has: dto.genre,
          },
        },
      });
    } else if (dto.genre === 0) {
      count = await this.prisma.item.count({
        where: {
          OR: [
            {
              keywords: {
                has: dto.keyword,
              },
            },
            {
              artist: {
                contains: dto.keyword,
              },
            },
            {
              fesName: {
                contains: dto.keyword,
              },
            },
          ],
        },
      });
    } else {
      count = await this.prisma.item.count({
        where: {
          OR: [
            {
              keywords: {
                has: dto.keyword,
              },
            },
            {
              artist: {
                contains: dto.keyword,
              },
            },
            {
              fesName: {
                contains: dto.keyword,
              },
            },
          ],
          categories: {
            has: dto.genre,
          },
        },
      });
    }
    if (response)
      items = response.map((item) => ({
        itemId: item.itemId,
        itemImage: item.itemImage,
        artist: item.artist,
        fesName: item.fesName,
      }));
    return { items: items, count: count };
  }
}
