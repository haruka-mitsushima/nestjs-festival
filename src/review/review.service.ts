import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/createReview-dto';
import { UpdateReviewDto } from './dto/updateReview-dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getUserReview(
    userId: number,
    itemId: number,
  ): Promise<{ isReviewed: boolean; reviewId?: number }> {
    const review = await this.prisma.review.findFirst({
      where: {
        userId: userId,
        itemId: itemId,
      },
    });
    if (review) {
      return { isReviewed: true, reviewId: review.reviewId };
    } else {
      return { isReviewed: false };
    }
  }

  async getReviewById(id: number): Promise<Review> {
    return this.prisma.review.findUnique({
      where: {
        reviewId: id,
      },
      include: {
        item: true,
      },
    });
  }

  async updateReviewById(id: number, dto: UpdateReviewDto): Promise<Review> {
    return await this.prisma.review.update({
      where: {
        reviewId: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async createReview(dto: CreateReviewDto): Promise<Review> {
    return await this.prisma.review.create({
      data: {
        ...dto,
      },
    });
  }

  async getSortedReview(
    id: number,
    orderBy: string,
    order: string,
    page: number,
    pageSize: number,
  ): Promise<Review[]> {
    const skip = (page - 1) * pageSize;
    return await this.prisma.review.findMany({
      where: {
        itemId: id,
      },
      orderBy: {
        [orderBy]: order,
      },
      skip: skip,
      select: {
        reviewId: true,
        itemId: true,
        userId: true,
        postTime: true,
        reviewTitle: true,
        reviewText: true,
        evaluation: true,
        spoiler: true,
        users: {
          select: {
            userName: true,
          },
        },
      },
    });
  }

  async getAverageScore(
    id: number,
  ): Promise<{ average: number; totalCount: number }> {
    const reviews = await this.prisma.review.findMany({
      where: {
        itemId: id,
      },
    });
    if (!reviews.length) {
      return { average: 0, totalCount: 0 };
    } else {
      const scoreArr = reviews.map((review: Review) => {
        return review.evaluation;
      });
      let sum = 0;
      if (!scoreArr.length) {
        sum = 0;
      } else {
        sum = scoreArr.reduce((pre: number, curr: number) => pre + curr);
      }
      // 平均点に１０をかけ、小数点を切り捨てた後１０で割ると小数点一桁のみ表示可能
      const average = Math.floor((sum / scoreArr.length) * 10) / 10;
      return { average: average, totalCount: reviews.length };
    }
  }
}
