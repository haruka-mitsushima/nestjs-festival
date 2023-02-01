import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Chatbot } from '@prisma/client';
import { ChatbotService } from './chatbot.service';

@Controller('api/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('getChatList')
  async getChatList(): Promise<Chatbot[]> {
    return this.chatbotService.getChatList();
  }

  @Get('getAnswer/:feeling/:who')
  async getAnswer(
    @Param('feeling', ParseIntPipe) feeling: number,
    @Param('who', ParseIntPipe) who: number,
  ): Promise<number> {
    return await this.chatbotService.getAnswer(feeling, who);
  }
}
