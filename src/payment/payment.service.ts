import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRentalHistoryDto } from './dto/addRentalHistory-dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async addRentalHistory(
    addItem: AddRentalHistoryDto[],
    userId: number,
  ): Promise<void> {
    // レンタル履歴テーブルとカートテーブルを同時更新
    await this.prisma.$transaction([
      // レンタル履歴に追加
      this.prisma.rentalHistory.createMany({
        data: addItem,
      }),
      // カート情報を削除
      this.prisma.cart.deleteMany({
        where: {
          userId: userId,
        },
      }),
    ]);
  }
}
