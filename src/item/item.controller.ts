import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Item } from 'src/type/item';
import { ItemService } from './item.service';

@Controller('api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('new')
  async getNewItems(): Promise<Item[]> {
    return await this.itemService.getNewItems();
  }

  @Post('preTop')
  async getPreTop(
    @Body('favoriteId') id: string,
  ): Promise<{ newItems: Item[]; genreItems: Item[] }> {
    return await this.itemService.preTop(Number(id));
  }

  @Get('favorite/:id')
  async getItemByFavoriteId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Item[]> {
    return await this.itemService.getItemsByGenreId(id);
  }
}
