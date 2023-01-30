import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/createReview-dto';
import { UpdateReviewDto } from './dto/updateReview-dto';
import { ReviewService } from './review.service';

@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('getUserReview/:userId/:itemId')
  async getUserReview(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<{ isReviewed: boolean; reviewId?: number }> {
    return await this.reviewService.getUserReview(userId, itemId);
  }

  @Get('getReviewById/:reviewId')
  async getReviewById(
    @Param('reviewId', ParseIntPipe) id: number,
  ): Promise<Review> {
    return await this.reviewService.getReviewById(id);
  }

  @Post('updateReviewById/:id')
  async updateReviewById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.updateReviewById(id, dto);
  }

  @Post('createReview')
  async createReview(@Body() dto: CreateReviewDto): Promise<Review> {
    return await this.reviewService.createReview(dto);
  }

  @Post('getSortedReview')
  async getSortReview(
    @Body('itemId', ParseIntPipe) itemId: number,
    @Body('orderBy') orderBy: string,
    @Body('order') order: string,
    @Body('page', ParseIntPipe) page: number,
    @Body('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<Review[]> {
    return this.reviewService.getSortedReview(
      itemId,
      orderBy,
      order,
      page,
      pageSize,
    );
  }

  @Get('getAverageScore/:itemId')
  async getAverage(
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<{ average: number; totalCount: number }> {
    return this.reviewService.getAverageScore(itemId);
  }
}
