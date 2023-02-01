import { Body, Controller, Post } from '@nestjs/common';
import { Item } from '@prisma/client';
import { SearchDto } from './dto/search-dto';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  async search(
    @Body() dto: SearchDto,
  ): Promise<{ items: Item[]; count: number }> {
    return await this.searchService.search(dto);
  }
}
