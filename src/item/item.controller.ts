import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Item } from 'src/type/item';
import { ItemService } from './item.service';

@Controller('api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('new')
  async getNewItems(): Promise<Item[]> {
    return await this.itemService.getNewItems();
  }

  @Get('favorite/:id')
  async getItemByFavoriteId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Item[]> {
    return await this.itemService.getItemsByGenreId(id);
  }
}
