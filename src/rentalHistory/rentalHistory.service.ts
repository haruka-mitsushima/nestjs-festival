import { Injectable } from '@nestjs/common';
import { RentalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentalHistoryService {
  constructor(private prisma: PrismaService) {}

  async selectRentalHistory(
    userId: number,
  ): Promise<{ rental: RentalHistory[] }> {
    const data = await this.prisma.rentalHistory.findMany({
      where: {
        userId: userId,
      },
    });
    return { rental: data };
  }

  async updateRentalHistory(
    id: number,
    data: { rentalStart: Date; rentalEnd: Date },
  ): Promise<void> {
    await this.prisma.rentalHistory.update({
      where: {
        rentalHistoryId: id,
      },
      data: {
        ...data,
      },
    });
  }
}
