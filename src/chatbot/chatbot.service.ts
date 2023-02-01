import { Injectable } from '@nestjs/common';
import { Chatbot } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  async getChatList(): Promise<Chatbot[]> {
    return await this.prisma.chatbot.findMany({
      include: {
        chatbotChoice: true,
      },
      orderBy: {
        chatbotId: 'asc',
      },
    });
  }

  async getAnswer(feeling: number, who: number): Promise<number> {
    const data = await this.prisma.chatbotAnswer.findUnique({
      where: {
        question1_question2: {
          question1: feeling,
          question2: who,
        },
      },
    });
    return data.categoryId;
  }
}
